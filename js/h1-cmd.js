	import util from './util.js'

	const SERVICE_UUID = '15F1E600-A277-43FC-A484-DD39EF8A9100'
	const CHARACTERISTIC_NOTIFY = '15F1E601-A277-43FC-A484-DD39EF8A9100'
	const CHARACTERISTIC_WRITE = '15F1E602-A277-43FC-A484-DD39EF8A9100'

	const RAW_SERVICE_UUID = '15F1E400-A277-43FC-A484-DD39EF8A9100'
	const RAW_CHARACTERISTIC_READ = '15F1E401-A277-43FC-A484-DD39EF8A9100'

	const SERVICE_UPDATE = '00010203-0405-0607-0809-0A0B0C0D1912'
	const CHARACTERISTIC_UPDATE = '00010203-0405-0607-0809-0A0B0C0D2B12'

	let MTU_SIZE = 160
	let MSG_ID_COUNTER = 0x00


	const ab2hex = (buffer) => {
	    const hexArr = Array.prototype.map.call(
	        new Uint8Array(buffer),
	        function(bit) {
	            return ('00' + bit.toString(16)).slice(-2)
	        }
	    )
	    return hexArr.join('')
	}

	/**
	 * �ַ���תASCIIʮ������
	 * @param {string} str 
	 */
	const str2hex = (str) => {
	    let hexStr = ''
	    for (let i = 0; i < str.length; i++) {
	        hexStr += str.substr(i, 1).charCodeAt().toString(16).padStart(2, 0)
	    }
	    return hexStr
	}

	/**
	 * ASCIIʮ������ת�ַ���
	 * @param {string} hexStr 
	 */
	const hex2str = (hexStr) => {
	    let str = ''
	    for (let i = 0; i < hexStr.length; i += 2) {
	        str += String.fromCharCode(Number.parseInt(hexStr.substr(i, 2), 16))
	    }
	    return str
	}


	module.exports = {
	    ab2hex,
	    str2hex,
	    hex2str,
	}


	function createCmds(serviceName, bodyJson = '', encry = 0) {
	    let messages = []
	    let header = {
	        version: 0,
	        cmdType: 0,
	        messageId: 0,
	        totalFrame: 1, // �ְ�����
	        frameSeq: 0, // �ְ��������к�
	        rev: 0, // ������
	        encry: 0, // ��������
	        ret: 0, //��Ӧ
	    }
	    let payload = {
	        rev: 0x11, //�����ֶ�
	        serviceLength: 0, // ����������
	        serviceName: '', // ������
	        bodyLength: 0x0000, // ���ݳ��ȣ�С�˸�ʽ
	        body: '', // json����
	        hmac: '', // У��ֵ���Ǳ���
	    }

	    header.messageId = MSG_ID_COUNTER++
	        if (MSG_ID_COUNTER > 0xFF) MSG_ID_COUNTER = 0
	    payload.serviceLength = serviceName.length
	    payload.serviceName = serviceName
	    payload.bodyLength = ((bodyJson.length & 0xFF) << 8) + (bodyJson.length >> 8)

	    let message = ''
	    let msgSize = 0
	    message += (header.version << 4 + header.cmdType).toString(16).padStart(2, '0')
	    msgSize++
	    message += header.messageId.toString(16).padStart(2, '0')
	    msgSize++
	    message += header.totalFrame.toString(16).padStart(2, '0')
	    msgSize++
	    message += header.frameSeq.toString(16).padStart(2, '0')
	    msgSize++
	    message += header.rev.toString(16).padStart(2, '0')
	    msgSize++
	    message += header.encry.toString(16).padStart(2, '0')
	    msgSize++
	    message += header.ret.toString(16).padStart(2, '0')
	    msgSize++
	    message += payload.rev.toString(16).padStart(2, '0')
	    msgSize++
	    message += payload.serviceLength.toString(16).padStart(2, '0')
	    msgSize++
	    message += util.str2hex(payload.serviceName)
	    msgSize += payload.serviceLength
	    message += payload.bodyLength.toString(16).padStart(4, '0')
	    msgSize += 2
	    if (msgSize + bodyJson.length <= MTU_SIZE) {
	        message += util.str2hex(bodyJson)
	        messages[0] = message
	    } else {
	        let i = 0
	        message += util.str2hex(bodyJson.substr(0, MTU_SIZE - msgSize))
	        messages[i] = message

	        do {
	            bodyJson = bodyJson.substr(MTU_SIZE - msgSize)

	            i++
	            message = ''
	            msgSize = 0
	            message += (header.version << 4 + header.cmdType).toString(16).padStart(2, '0')
	            msgSize++
	            message += header.messageId.toString(16).padStart(2, '0')
	            msgSize++
	            message += header.totalFrame.toString(16).padStart(2, '0')
	            msgSize++
	            header.frameSeq++
	                message += header.frameSeq.toString(16).padStart(2, '0')
	            msgSize++
	            message += header.rev.toString(16).padStart(2, '0')
	            msgSize++
	            message += header.encry.toString(16).padStart(2, '0')
	            msgSize++
	            message += header.ret.toString(16).padStart(2, '0')
	            msgSize++
	            message += util.str2hex(bodyJson.substr(0, MTU_SIZE - msgSize))
	            messages[i] = message
	        } while (msgSize + bodyJson.length > MTU_SIZE)

	        console.log({
	            messages
	        });
	        for (let i = 0; i < messages.length; i++) {
	            messages[i] = messages[i].substr(0, 4) + messages.length.toString(16).padStart(2, '0') + messages[i]
	                .substr(6)
	        }
	    }

	    return {
	        messageId: header.messageId,
	        messages,
	    }
	}

	function parseMessage(message) {
	    let header = {
	        version: 0,
	        cmdType: 0,
	        messageId: 0,
	        totalFrame: 1, // �ְ�����
	        frameSeq: 0, // �ְ��������к�
	        rev: 0, // ������
	        encry: 0, // ��������
	        ret: 0, //��Ӧ
	    }
	    let payload = {
	        rev: 0x11, //�����ֶ�
	        serviceLength: 0, // ����������
	        serviceName: '', // ������
	        bodyLength: 0x0000, // ���ݳ��ȣ�С�˸�ʽ
	        body: '', // json����
	        hmac: '', // У��ֵ���Ǳ���
	    }

	    /**
	     * ����
	     */
	    let offset = 0;
	    header.version = Number.parseInt(message.substr(offset, 2), 16) >> 4
	    header.cmdType = Number.parseInt(message.substr(offset, 2), 16) & 0x0F
	    offset += 2
	    header.messageId = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2
	    header.totalFrame = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2
	    header.frameSeq = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2
	    header.rev = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2
	    header.encry = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2
	    header.ret = Number.parseInt(message.substr(offset, 2), 16)
	    offset += 2

	    if (header.frameSeq == 0) {
	        payload.rev = Number.parseInt(message.substr(offset, 2), 16)
	        offset += 2
	        payload.serviceLength = Number.parseInt(message.substr(offset, 2), 16)
	        offset += 2
	        payload.serviceName = util.hex2str(message.substr(offset, payload.serviceLength * 2))
	        offset += payload.serviceLength * 2
	        payload.bodyLength = Number.parseInt(message.substr(offset, 2), 16) + (Number.parseInt(message.substr(offset +
	            2, 2), 16) << 8)
	        offset += 4
	        payload.body = util.hex2str(message.substr(offset, payload.bodyLength * 2))
	        offset += payload.bodyLength * 2
	    } else {
	        payload.body = util.hex2str(message.substr(offset))
	    }

	    return {
	        header,
	        payload
	    }
	}

	let SEQ = 0
	let CMD_CustomSecData
	let receiver = []

	/* Ҫ���͵���Ϣ���� */
	var MSG_QUEUE = []

	function sendCustomData(sid, data = {}) {
	    console.log('sendCustomData', {
	        sid,
	        data
	    });
	    let customSecData = {
	        vendor: {
	            sid,
	            data,
	        },
	        seq: ++SEQ
	    }
	    CMD_CustomSecData = createCmds('customSecData', JSON.stringify(customSecData), 0x00)
	    sendCmds(CMD_CustomSecData)
	}

	function sendCmds(cmds) {
	    if (cmds.messages && cmds.messages.length) {
	        receiver[cmds.messageId] = {
	            counter: 0,
	            bodies: []
	        }
	        sendMessages(cmds.messages)
	    }
	}

	function sendMessages(messages = []) {
	    for (let i = messages.length - 1; i >= 0; i--) {
	        MSG_QUEUE.push(messages[i])
	    }
	    sendLastestRequest()
	}

	function sendLastestRequest() {
	    console.log('MSG_QUEUE', MSG_QUEUE)
	    let msg = MSG_QUEUE.pop()
	    bleWrite(msg)
	    setTimeout(() => {
	        if (MSG_QUEUE.length > 0) {
	            sendLastestRequest()
	        }
	    }, 100)
	}

	function bleWrite(hexStr) {
	    console.log('д������', hexStr);
	    let len = Math.floor(hexStr.length / 2)
	        // �������豸����16��������
	    const buffer = new ArrayBuffer(len)
	    const dataView = new DataView(buffer)
	    let str
	    for (let i = 0; i < len; i++) {
	        str = hexStr.substr(i * 2, 2)
	        dataView.setUint8(i, parseInt(str, 16))
	    }
	    uni.writeBLECharacteristicValue({
	        deviceId,
	        serviceId: SERVICE_UUID,
	        characteristicId: CHARACTERISTIC_WRITE,
	        value: buffer,
	        success(res) {
	            console.log('д������ ok')
	        },
	        fail(err) {
	            console.log('д������ err')
	        }
	    })
	}

	function processRead(hexStr) {
	    hexStr = hexStr.toUpperCase()
	    console.log('������ȡ��Ϣ', hexStr)
	    let str = util.hex2str(hexStr)
	    console.log(str);
	    let mats = str.match(/"fwv":"([0-9\.]+)"/)
	    console.log('�̼��汾��', mats);
	    mats = str.match(/"hwv":"([0-9\.]+)"/)
	    console.log('Ӳ���汾��', mats);
	}

	function processNotify(hexStr) {
	    hexStr = hexStr.toUpperCase()
	    console.log('����������Ϣ', hexStr);
	    let ret = parseMessage(hexStr)
	        // console.log(ret);
	    for (let i = 0, bodies = receiver[ret.header.messageId].bodies; i < bodies.length; i++) {
	        if (bodies[i] == ret.payload.body) return
	    }
	    receiver[ret.header.messageId].counter++
	        receiver[ret.header.messageId].bodies[ret.header.frameSeq] = ret.payload.body
	        // console.log(receiver,ret.header.messageId);
	    if (receiver[ret.header.messageId].counter == ret.header.totalFrame) {
	        let revMsgJson = receiver[ret.header.messageId].bodies.join('')
	        revMsgJson = revMsgJson.replace(/\,\}/g, '}').replace(/\,\]/g, ']')
	        console.log({
	            revMsgJson
	        })
	        let revMsg = JSON.parse(revMsgJson)
	        console.log({
	            revMsg
	        })
	        receiver[ret.header.messageId] = {
	            counter: 0,
	            bodies: []
	        }
	        switch (ret.header.messageId) {
	            case CMD_CustomSecData.messageId:
	                console.log('customSecData')
	                if (revMsg && revMsg.vendor && revMsg.vendor.sid) {
	                    switch (revMsg.vendor.sid) {
	                        case 'getState':
	                            console.log('ˮ��״̬:', revMsg.vendor.data)
	                            break
	                    }
	                }
	                break
	        }
	    }
	}

	// ����״̬����  �� notify����ʡ��
	processNotify(util.ab2hex(res.value))

	// ������ȡ���������ݣ� ��ȡ����ʡ��
	processRead(util.ab2hex(res.value))

	// ��ȡ�豸״̬
	sendCustomData('getState')
	    // sendCustomData('setState', {
	    // 	holdTemp: 55
	    // })

	// // �����豸״̬
	// sendCustomData('setState', {
	// 	work: 'idle'
	// })

	// // �����豸
	// sendCustomData('reset')