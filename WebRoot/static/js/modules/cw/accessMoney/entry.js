var id = $("#id").val();

			function initit() {
				//alert(id);
				if(id != "") {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccessmoney_list", {
						ACCESS_ID: id
					}, getinfo_res);
				}

			}

			function getinfo_res(data) {
				try {
					if(data.success != 1) {
						alert("server.error:" + data.msg);
						return;
					}
					var info = data.rows[0];
					myjstools.setallinput(info);
					$("#TIAOCHU_BIZHONG").val(info.TIAOCHU_BIZHONG);
					$("#TIAOCHU_PAYMENT_MODE").val(info.TIAOCHU_PAYMENT_MODE);
					$("#TIAOCHU_PAYMENT_ACCOUNTID").val(info.TIAOCHU_PAYMENT_ACCOUNTID);
					$("#TIAORU_BIZHONG").val(info.TIAORU_BIZHONG);
					$("#TIAORU_RECEIPT_MODE").val(info.TIAORU_RECEIPT_MODE);
					$("#TIAORU_RECEIPT_ACCOUNTID").val(info.TIAORU_RECEIPT_ACCOUNTID);
				} catch(e) {
                    swal({title:'',text:"getinfo_res.error:出错了！" + e.message,type:'error'});
				}
			}
			$(function() {
				initit();
			});

			function saveit() {
				//alert($("#KAIHU_BANK").val());

				var objt = myjstools.getallinput();
				objt.TIAOCHU_BIZHONG = $("#TIAOCHU_BIZHONG option:selected").val();
				objt.TIAOCHU_PAYMENT_MODE = $("#TIAOCHU_PAYMENT_MODE option:selected").val();
				objt.TIAOCHU_PAYMENT_ACCOUNTID = $("#TIAOCHU_PAYMENT_ACCOUNTID option:selected").val();
				objt.TIAORU_BIZHONG = $("#TIAORU_BIZHONG option:selected").val();
				objt.TIAORU_RECEIPT_MODE = $("#TIAORU_RECEIPT_MODE option:selected").val();
				objt.TIAORU_RECEIPT_ACCOUNTID = $("#TIAORU_RECEIPT_ACCOUNTID option:selected").val();
				if(id != "") {
					objt.ACCESS_ID = id;
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccessmoney_edit", objt, saveit_res);
				} else {
					myjstools.ajax(false, "POST", "/web/service?METHOD=cwaccessmoney_add", objt, saveit_res);
				}
			}

			function saveit_res(data) {
				try {
					if(data.success != 1) {
                        swal({title:'',text:"server.error:" + data.msg,type:'error'});
						return;
					}
                    swal({
                        title:'',
                        text: '操作成功！',
                        type: 'success'
                    },function () {
                        $("#entry_qx").click();
                    });

				} catch(e) {
                    swal({title:'',text:"saveit_res.error:出错了！" + e.message,type:'error'});
				}
			}