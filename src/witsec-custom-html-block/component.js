defineM("witsec-custom-html", function(g, mbrApp, tr) {
	mbrApp.loadComponents(
		"witsec-custom-html",
		{"witsec-custom-html-block":{
				_group:"witsec",
				_onParamsShow: function(e,$params,$block) {
					// If we don't encode the textareas, it'll mess up the HTMLCode textarea in the gear box
					// And we have to do this again in the _onParamsChange block as well
					// The encoded textareas are automatically decoded, so the result is as it should be :)
					this._params.HTMLCode = this.HTMLCode.replace(/<\/textarea/gim, "&lt;/textarea")
				},
				_params:{
					HTMLCode:{type:"textarea",title:"HTML:",default:"Your HTML goes here. Please use the gear-icon to edit the HTML."},
					hideOnPublish:{type:"switch",title:"Hide Block on Publish",default:!1},
					paddingTop:{type:"range",title:"Top Padding",min:0,max:8,step:1,default:2,halfWidth:true},	
					paddingBottom:{type:"range",title:"Bottom Padding",min:0,max:8,step:1,default:2,halfWidth:true},
					bgImageRadio:{type:"radio",title:"Background Image",name:"bgType",default:!1},
					bgImage:{type:"image",title:"",default:"images/bg3.jpg",condition:["bgImageRadio"]},
					parallax:{type:"switch",title:"Parallax",default:!0,condition:["bgImageRadio"]},
					bgColorRadio:{type:"radio",title:"Background Color",name:"bgType",default:!0},
					bgColor:{type:"color",title:"Color",default:"#fff",condition:["bgColorRadio"]},
					overlay:{type:"switch",title:"Overlay",default:!1,condition:["!bgColorRadio"]},
					overlayColor:{type:"color",title:"Color",default:"#222",condition:["overlay","!bgColorRadio"]},
					overlayOpacity:{type:"range",title:"Opacity",min:0,max:1,step:.1,default:.5,condition:["overlay","!bgColorRadio"]}
				},
				HTMLCode:"Your HTML goes here. Please use the gear-icon to edit the HTML.",
				_onParamsChange:function($item, param, val){
					if (param == "HTMLCode") {
						this.HTMLCode = val;
						this._params.HTMLCode = this.HTMLCode.replace(/<\/textarea/gim, "&lt;/textarea");
					}

					if (param == 'paddingTop') {
						$item.find('.witsec-custom-html-container').css('padding-top', val + 'rem');
					}

					if (param == 'paddingBottom') {
						$item.find('.witsec-custom-html-container').css('padding-bottom', val + 'rem');
					}

					if (typeof paramName === 'undefined') {
						$item.find('.witsec-custom-html-container').css({'padding-top': this._params.paddingTop + 'rem','padding-bottom': this._params.paddingBottom + 'rem'});
					}

					// If the HTML is empty and all padding set to 0, you kinda lose the block. Let's assist the user and give him back control
					if (this._params.HTMLCode == "" && this._params.paddingTop == 0 && this._params.paddingBottom == 0) {
						this._params.paddingTop = 2;
						this._params.paddingBottom = 2;
						$item.find('.witsec-custom-html-container').css({'padding-top': this._params.paddingTop + 'rem','padding-bottom': this._params.paddingBottom + 'rem'});
						alert("WARNING: your HTML is empty and padding is set to 0. This makes your block very hard to reach within Mobirise. I've reset padding to 2, so the block is properly visible.");
					}
				},
				_publishFilter: function($obj) {
					if (this._params.hideOnPublish)
						$obj.find('.witsec-custom-html-container').css({'padding-top': '0rem','padding-bottom': '0rem'});
					else
						$obj.find('.witsec-custom-html-container').css({'padding-top': this._params.paddingTop + 'rem','padding-bottom': this._params.paddingBottom + 'rem'});
				}
			}
		}
	);
}, ["jQuery", "mbrApp", "TR()"]);