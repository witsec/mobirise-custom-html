mbrApp.loadComponents(
	"witsec-custom-html",
	{"witsec-custom-html-block":{
			_group:"Article",
			_onParamsShow: function(e,$params,$block) {
				// If we don't encode the textareas, it'll mess up the HTMLCode textarea in the gear box
				// And we have to do this again in the _onParamsChange block as well
				// The encoded textareas are automatically decoded, so the result is as it should be :)
				this._params.HTMLCode = this.HTMLCode.replace(/<\/textarea/gim, "&lt;/textarea")
			},
			_params:{
				HTMLCode:{type:"textarea",title:"HTML:",default:"Enter your HTML here"},
				paddingTop:{type:"range",title:"Top/Bottom",min:0,max:8,step:1,default:2},
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
			paddingTop:".block {padding-bottom:2rem; padding-top:2rem;}",
			_onParamsChange:function(c,a,b){
				"HTMLCode"==a&&(
					this.HTMLCode=b,
					this._params.HTMLCode=this.HTMLCode.replace(/<\/textarea/gim, "&lt;/textarea")
				);
				"paddingTop"==a&&(
					this.paddingTop=".block {padding-bottom:"+b+"rem; padding-top:"+b+"rem;}"
				)
			}	
		}
	}
);
