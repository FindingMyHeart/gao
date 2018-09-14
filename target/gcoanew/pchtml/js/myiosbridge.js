var ua = navigator.userAgent.toLowerCase();	
if (/iphone|ipad|ipod/.test(ua)) {
	//alert("iphone");		
	androidcontact=false;
    ios_token="";


	window.onerror = function(err) {
		//log('window.onerror: ' + err)
	}
	
	function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge)
			}, false)
		}
	}
	/*
	connectWebViewJavascriptBridge(function(bridge) {
		var uniqueId = 1
		function log(message, data) {
			var log = document.getElementById('log')
			var el = document.createElement('div')
			el.className = 'logLine'
			el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
			if (log.children.length) { log.insertBefore(el, log.children[0]) }
			else { log.appendChild(el) }
		}
		bridge.init(function(message, responseCallback) {
			log('JS got a message', message)
			var data = { 'Javascript Responds':'Wee!' }
			log('JS responding with', data)
			responseCallback(data)
		})
		bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
			log('ObjC called testJavascriptHandler with', data)
			var responseData = { 'Javascript Says':'Right back atcha!' }
			log('JS responding with', responseData)
			responseCallback(responseData)
		})
		bridge.registerHandler('LoadFinishedHandler', function(data, responseCallback) {
			//initit();
			responseCallback(responseData);
		})
	})
	*/
	var applecontact = {
		//init
		callinitfunc: function(callback){
			connectWebViewJavascriptBridge(function(bridge) {
				//var uniqueId = 1
				bridge.init(function(message, responseCallback) {
					var data = { 'Javascript Responds':'Wee!' };
					responseCallback(data);
				});

				bridge.registerHandler('ios_btnrightclick', function(data, responseCallback) {
					myjstools.btnrightclick(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});

				bridge.registerHandler('ios_mygoback', function(data, responseCallback) {
					myjstools.mygoback();
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_gotologin_sucess', function(data, responseCallback) {
					myjstools.gotologin_sucess();
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_gotologin_error', function(data, responseCallback) {
					myjstools.gotologin_error();
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_opennewweb_callback', function(data, responseCallback) {
					myjstools.opennewweb_callback(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_getcity_callback', function(data, responseCallback) {
					myjstools.getcity_callback(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_webview_scrollbottomover', function(data, responseCallback) {
					myjstools.webview_scrollbottomover(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_webview_selectimages_res', function(data, responseCallback) {
					myjstools.selectimages_res(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});
				bridge.registerHandler('ios_alipay_callback', function(data, responseCallback) {
					myjstools.alipay_callback(data);
					var responseData = { 'result':'ok' }
					responseCallback(responseData)
				});

			});
			connectWebViewJavascriptBridge(callback);
		},
		// ��ҳ�� 
		opennewweb: function(url) {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'opennewweb','url': url}, function(response) {
				//log('JS got response', response)
			})
		},
		// ��ҳ�� 
		opennewwebandreturn: function(url) {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'opennewwebandreturn','url': url}, function(response) {
				//log('JS got response', response)
			})
		},
		//
		showerrinfo: function(errinfo) {
			//alert(errinfo);
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'showerrinfo','errinfo': errinfo}, function(response) {
				//log('JS got response', response)
			})
		},
		//gettoken
		gettoken: function(callback) {
			//callback("2222");
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'gettoken'}, function(response) {
				//log('JS got response', response)
				//ios_token=response;
				callback(response);
			})
			//return "c";
		},
		//gotologin
		gotologin: function(lflag) {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'gotologin','lflag': lflag}, function(response) {
				//log('JS got response', response)
			})
		},
		//ѡ�����
		getcity: function() {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'getcity'}, function(response) {
				//log('JS got response', response)
			})
		},
		//���ñ���
		settitle: function(title) {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'settitle','title': title}, function(response) {
				//log('JS got response', response)
			})
		},
		//��ʼ���Ҳఴť
		initbtnright: function(vis_1, title_1, icon_1
            ,vis_2, title_2, icon_2
            ,vis_3, title_3, icon_3) {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'initbtnright','vis_1':vis_1,'title_1':title_1,'icon_1':icon_1
								,'vis_2':vis_2,'title_2':title_2,'icon_2':icon_2
								,'vis_3':vis_3,'title_3':title_3,'icon_3':icon_3}, function(response) {
				//log('JS got response', response)
			})
		},
		//����Ӷ�̬ �ı�
		gotoadddt1: function() {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'gotoadddt1'}, function(response) {
				//log('JS got response', response)
			})
		},
		//����Ӷ�̬ ͼ��
		gotoadddt2: function() {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'gotoadddt2'}, function(response) {
				//log('JS got response', response)
			})
		},
		//���������
		gotoaddwenti: function() {
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'gotoaddwenti'}, function(response) {
				//log('JS got response', response)
			})
		},
		// webview�ص����˷����� ҳ��Ӧ��д�������
		mygoback: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'mygoback'}, function(response) {
				//log('JS got response', response)
			})
		},
		// ���ú��˲��ǹرմ���
		setgobackisnotclose: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'setgobackisnotclose'}, function(response) {
				//log('JS got response', response)
			})
		},
		// 
		opimlist: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'opimlist'}, function(response) {
				//log('JS got response', response)
			})
		},
		// 
		opim: function(struser){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'opim','struser': struser}, function(response) {
				//log('JS got response', response)
			})
		},
		selectimages: function(max){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'selectimages','max':max}, function(response) {
				//log('JS got response', response)
			})
		},
		closewebviewandresult: function(strres){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'closewebviewandresult','strres':strres}, function(response) {
				//log('JS got response', response)
			})
		},
		closewebview: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'closewebview'}, function(response) {
				//log('JS got response', response)
			})
		},
		showimages: function(imageurls, startpos){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'showimages','imageurls':imageurls, 'startpos':startpos}, function(response) {
				//log('JS got response', response)
			})
		},
		qhsf: function(clienttype){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'qhsf','clienttype':clienttype}, function(response) {
				//log('JS got response', response)
			})
		},
		showmessagelist: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'showmessagelist'}, function(response) {
				//log('JS got response', response)
			})
		},
		showset: function(){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'showset'}, function(response) {
				//log('JS got response', response)
			})
		},
		alipay: function(subject, body, price, ptype, pid){
			WebViewJavascriptBridge.callHandler('objcCallback', {'method': 'alipay','subject': subject,'body': body,'price': price,'ptype': ptype,'pid': pid}, function(response) {
				//log('JS got response', response)
			})
		}
		//
	};


};
