(()=>{"use strict";var e={8667:(e,t,n)=>{n(6992),n(8674),n(9601),n(7727),n(2222),n(4678),n(6977);var a=n(5010),o=n(3396);function r(e,t,n,a,r,i){var s=(0,o.up)("AuthPage"),l=(0,o.up)("MainPage");return(0,o.wg)(),(0,o.iD)(o.HY,null,[e.$store.state.diskAuthentication.disk?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(s,{key:0})),e.$store.state.diskAuthentication.disk?((0,o.wg)(),(0,o.j4)(l,{key:1})):(0,o.kq)("",!0)],64)}var i={class:"auth-page__wrapper"};function s(e,t,n,a,r,s){var l=(0,o.up)("GeneralButton");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o.Wm)(l,{onClick:s.getYandexKey,button:{text:"Yandex.Disk"}},null,8,["onClick","button"])])}n(5827),n(1539),n(4916),n(5306),n(4765);var l=n(7139),u=["id","type"];function c(e,t,n,a,r,i){return(0,o.wg)(),(0,o.iD)("button",{id:n.button.id,type:n.button.type},(0,l.zw)(n.button.text),9,u)}const d={name:"GeneralButton",props:{button:{Type:Object,default:{}},formId:{Type:String,default:""}}};var p=n(89);const m=(0,p.Z)(d,[["render",c]]),h=m,f={name:"AuthPage",components:{GeneralButton:h},methods:{getYandexKey:function(){window.location.href="https://oauth.yandex.ru/authorize?response_type=token&client_id=b81d324fedb341438bb6f7f22749b376&redirect_uri=http://localhost:8888/?disk=yandex"}},created:function(){this.$store.dispatch("CHECK_AUTH")},mounted:function(){var e=window.location.search.replace("?","").split("&").reduce((function(e,t){var n=t.split("=");return e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]),e}),{}),t=window.location.hash.replace("#","").split("&").reduce((function(e,t){var n=t.split("=");return e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]),e}),{});"yandex"===e.disk&&"undefined"!==typeof t.access_token&&this.$store.dispatch("LOGIN",{disk:"yandex",token:t.access_token})}},_=(0,p.Z)(f,[["render",s],["__scopeId","data-v-50023cd2"]]),E=_;function v(e,t,n,a,r,i){var s=(0,o.up)("DiskForm"),l=(0,o.up)("HeaderBlock"),u=(0,o.up)("DiskTable"),c=(0,o.up)("Loader");return(0,o.wg)(),(0,o.iD)(o.HY,null,[e.$store.state.isShowUploadForm?((0,o.wg)(),(0,o.j4)(s,{key:0,"form-id":"main-upload-form"})):(0,o.kq)("",!0),(0,o.Wm)(l),(0,o.Wm)(u),e.$store.state.isShowLoader?((0,o.wg)(),(0,o.j4)(c,{key:1})):(0,o.kq)("",!0)],64)}var k=["id"],g=(0,o._)("p",{class:"disk-form__comment"},[(0,o.Uk)("Файл будет загружен в текущую папку. "),(0,o._)("br"),(0,o._)("span",null,"При наличии файла с таким же названием - исходный будет перезаписан")],-1);function w(e,t,n,a,r,i){var s=(0,o.up)("FileInput"),u=(0,o.up)("GeneralButton");return(0,o.wg)(),(0,o.iD)("div",{onClick:t[0]||(t[0]=function(){return i.closeModal&&i.closeModal.apply(i,arguments)}),class:"form-wrapper"},[(0,o._)("div",{class:"disk-form",id:n.formId},[(0,o.Wm)(s,{"form-id":n.formId},null,8,["form-id"]),(0,o.Wm)(u,{onClick:i.submitFile,class:(0,l.C_)("disk-form__upload-btn"),disabled:!(e.$store.state.uploadFormReadyForSubmit&&e.$store.state.uploadFormSubmitted),button:{text:i.uploadBtnText,type:"button"},"form-id":n.formId},null,8,["onClick","disabled","button","form-id"]),g],8,k)])}n(6699),n(2023),n(8309);var T=["type","name","placeholder","value"];function b(e,t,n,a,r,i){return(0,o.wg)(),(0,o.iD)("input",{type:n.input.type,name:n.input.name,placeholder:n.input.placeholder,value:n.input.value},null,8,T)}const O={name:"GeneralInput",props:{input:{Type:Object,default:{}}}},y=(0,p.Z)(O,[["render",b]]),C=y;var N={class:"disk-form__file-list"};function F(e,t,n,a,r,i){var s=(0,o.up)("GeneralInput");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",{onClick:t[0]||(t[0]=function(){return i.choiceFile&&i.choiceFile.apply(i,arguments)}),class:"input-file-btn"}),(0,o.Wm)(s,{onChange:i.prepareUpload,hidden:!0,input:{type:"file",name:"upload-file"},multiple:!0},null,8,["onChange"]),(0,o._)("ul",N,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.selectedFiles,(function(t){return(0,o.wg)(),(0,o.iD)("li",null,(0,l.zw)(t.name)+" ("+(0,l.zw)(e.formatBytes(t.size))+")",1)})),256))])],64)}n(7658);const L={name:"FileInput",data:function(){return{selectedFiles:[]}},props:{formId:{Type:String,default:""},inputName:{Type:String,default:""}},components:{GeneralInput:C},methods:{choiceFile:function(){var e=this.form.querySelector("[name=upload-file]");e.click()},prepareUpload:function(e){var t=e.target.files,n=t.length;if(n>0){for(var a=0;a<n;a++)this.selectedFiles.push(t[a]);this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormReadyForSubmit",value:!0})}}},mounted:function(){this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormReadyForSubmit",value:!1})},computed:{form:function(){return document.getElementById(this.formId)}}},G=(0,p.Z)(L,[["render",F],["__scopeId","data-v-07004d20"]]),R=G,x={name:"DiskForm",props:{formId:{Type:String,default:""}},components:{FileInput:R,GeneralInput:C,GeneralButton:h},methods:{closeModal:function(e){var t=e.composedPath().includes(this.form);t||this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"isShowUploadForm",value:!1})},submitFile:function(){var e=this.form.querySelector("[name=upload-file]");"undefined"!==typeof e.files[0]&&(this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormSubmitted",value:!1}),this.$store.dispatch("UPLOAD_FILE",e.files))}},mounted:function(){this.form.querySelector("[name=upload-file]")},computed:{form:function(){return document.getElementById(this.formId)},uploadBtnText:function(){return this.$store.state.uploadFormReadyForSubmit&&this.$store.state.uploadFormSubmitted?"Загрузить":this.$store.state.uploadFormSubmitted?"Выберите файл":this.$store.state.uploadFormSubmitted?void 0:"Загрузка..."}}},A=(0,p.Z)(x,[["render",w]]),S=A;var D={class:"disk-table"},I=(0,o._)("thead",null,[(0,o._)("tr",null,[(0,o._)("th",null," Название "),(0,o._)("th",null," Тип "),(0,o._)("th",null," Размер "),(0,o._)("th",null," Действия ")])],-1);function H(e,t,n,a,r,i){var s=(0,o.up)("DiskTableBlock"),l=(0,o.up)("DiskTablePagination");return(0,o.wg)(),(0,o.iD)("table",D,[I,(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.$store.state.diskElements,(function(e){return(0,o.wg)(),(0,o.j4)(s,{key:e.id,"table-element":e},null,8,["table-element"])})),128)),(0,o.Wm)(l)])])}function M(e,t,n,a,r,i){var s=(0,o.up)("DiskTableBlockElement");return(0,o.wg)(),(0,o.j4)(s,{item:n.tableElement},null,8,["item"])}n(2772);var $=["data-path"],j=["data-path"],Z={class:"disk-table__item__controls"};function B(e,t,n,a,r,i){var s=(0,o.up)("GeneralButton");return(0,o.wg)(),(0,o.iD)("tr",{class:(0,l.C_)(["disk-table__item",{"disk-table__item--dir":"dir"===n.item.type,"disk-table__item--file":"file"===n.item.type}])},["dir"===n.item.type?((0,o.wg)(),(0,o.iD)("td",{key:0,class:"disk-table__item__name",onClick:t[0]||(t[0]=function(){return i.goToDir&&i.goToDir.apply(i,arguments)}),"data-path":n.item.path},(0,l.zw)(n.item.name),9,$)):(0,o.kq)("",!0),"file"===n.item.type?((0,o.wg)(),(0,o.iD)("td",{key:1,class:"disk-table__item__name","data-path":n.item.path},(0,l.zw)(n.item.name),9,j)):(0,o.kq)("",!0),(0,o._)("td",null,(0,l.zw)(i.fileType),1),(0,o._)("td",null,(0,l.zw)(e.formatBytes(n.item.size)),1),(0,o._)("td",null,[(0,o._)("div",Z,[-1!==n.item.actions.indexOf("download")?((0,o.wg)(),(0,o.j4)(s,{key:0,onClick:i.downloadFile,button:{text:"Скачать"}},null,8,["onClick"])):(0,o.kq)("",!0),-1!==n.item.actions.indexOf("rename")?((0,o.wg)(),(0,o.j4)(s,{key:1,onClick:i.renameFile,button:{text:"Переименовать"}},null,8,["onClick"])):(0,o.kq)("",!0),-1!==n.item.actions.indexOf("delete")?((0,o.wg)(),(0,o.j4)(s,{key:2,onClick:i.deleteFile,button:{text:"Удалить"}},null,8,["onClick"])):(0,o.kq)("",!0)])])],2)}const P={name:"DiskTableBlockElement",components:{GeneralButton:h},props:{item:{type:Object,default:""},fileType:{type:String,default:""}},methods:{deleteFile:function(){confirm("Вы точно хотите удалить "+this.item.name)&&this.$store.dispatch("DELETE_FILE",this.item.path)},downloadFile:function(){this.$store.dispatch("DOWNLOAD_FILE",this.item.path)},renameFile:function(){var e=prompt("Переименовать",this.item.name);null!==e&&e!==this.item.name&&""!==e&&this.$store.dispatch("RENAME_FILE",{resource:this.item.path,newResourceName:e})},goToDir:function(e){this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"paginationCurrent",value:1}),this.$store.dispatch("GET_RESOURCE",{path:e.target.getAttribute("data-path")})}},computed:{fileType:function(){return"dir"===this.item.type?"Папка":"file"===this.item.type?"Файл":""}}},U=(0,p.Z)(P,[["render",B]]),z=U,q={name:"DiskTableRow",components:{DiskTableBlockElement:z},props:{tableElement:{type:Object,default:""}}},K=(0,p.Z)(q,[["render",M]]),W=K;var Y={colspan:"4",class:"disk-table__pagination"},J={class:"disk-table__pagination__controls"};function Q(e,t,n,a,r,i){var s=(0,o.up)("GeneralButton");return(0,o.wg)(),(0,o.iD)("tr",null,[(0,o._)("td",Y,[(0,o._)("div",J,[(0,o.Wm)(s,{class:"disk-table__pagination__button",onClick:i.previewPage,button:{text:"<"},disabled:1===e.$store.state.paginationCurrent},null,8,["onClick","disabled"]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.pages,(function(t){return(0,o.wg)(),(0,o.iD)("div",{class:(0,l.C_)(["disk-table__pagination__page",{"disk-table__pagination__page--current":t===e.$store.state.paginationCurrent}])},[(0,o._)("span",null,(0,l.zw)(t),1)],2)})),256)),(0,o.Wm)(s,{class:"disk-table__pagination__button",onClick:i.nextPage,button:{text:">"},disabled:0===e.$store.state.paginationAllow},null,8,["onClick","disabled"])])])])}const V={name:"DiskTablePagination",components:{GeneralButton:h},methods:{previewPage:function(){this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"paginationCurrent",value:this.$store.state.paginationCurrent-1}),this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"paginationAllow",value:this.$store.state.paginationAllow+1}),this.$store.dispatch("GET_RESOURCE",{path:this.$store.state.currentPath})},nextPage:function(){this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"paginationCurrent",value:this.$store.state.paginationCurrent+1}),this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"paginationAllow",value:this.$store.state.paginationAllow-1}),this.$store.dispatch("GET_RESOURCE",{path:this.$store.state.currentPath})}},computed:{pages:function(){var e=this.$store.state.paginationCurrent,t=this.$store.state.paginationAllow,n=[];switch(e){case 1:n=[1];break;case 2:n=[1,2];break;default:n=[e-2,e-1,e];break}for(var a=e+t,o=e+1;o<=a;o++)n.push(o);return n}}},X=(0,p.Z)(V,[["render",Q]]),ee=X,te={name:"DiskTable",components:{DiskTableBlock:W,DiskTablePagination:ee}},ne=(0,p.Z)(te,[["render",H]]),ae=ne;n(9720);var oe={class:"header"};function re(e,t,n,a,r,i){var s=(0,o.up)("HeaderDiskInfo");return(0,o.wg)(),(0,o.iD)("header",oe,[0!==Object.entries(this.$store.state.diskInfo).length?((0,o.wg)(),(0,o.j4)(s,{key:0})):(0,o.kq)("",!0)])}var ie={class:"header-disk-info"},se={class:"header-disk-info__user-name"},le={class:"header-disk-info__space header-disk-info__space--total"},ue={class:"header-disk-info__space header-disk-info__space--total"};function ce(e,t,n,a,r,i){var s=(0,o.up)("GeneralButton");return(0,o.wg)(),(0,o.iD)("div",ie,[(0,o._)("div",null,[(0,o._)("p",se,(0,l.zw)(this.$store.state.diskInfo.user_name),1),(0,o._)("p",le,"Свободно: "+(0,l.zw)(this.formatBytes(this.$store.state.diskInfo.total_space)),1),(0,o._)("p",ue,"Общий объём: "+(0,l.zw)(this.formatBytes(this.$store.state.diskInfo.free_space)),1)]),(0,o._)("div",null,[(0,o.Wm)(s,{class:(0,l.C_)("header-disk-info__upload-btn"),onClick:i.showUploadForm,button:{text:"Загрузить"}},null,8,["onClick"]),(0,o.Wm)(s,{class:(0,l.C_)("header-disk-info__upload-btn"),onClick:i.unLogin,button:{text:"Выйти"}},null,8,["onClick"])])])}const de={name:"HeaderDiskInfo",components:{GeneralButton:h},methods:{showUploadForm:function(){this.$store.commit("CHANGE_ROOT_ELEMENT",{name:"isShowUploadForm",value:!0})},unLogin:function(){this.$store.dispatch("UNLOGIN")}}},pe=(0,p.Z)(de,[["render",ce],["__scopeId","data-v-05504ac5"]]),me=pe,he={name:"HeaderBlock",components:{HeaderDiskInfo:me,DiskForm:S}},fe=(0,p.Z)(he,[["render",re],["__scopeId","data-v-e46be958"]]),_e=fe;var Ee={class:"loader-wrapper"};function ve(e,t,n,a,r,i){return(0,o.wg)(),(0,o.iD)("div",Ee)}const ke={name:"Loader"},ge=(0,p.Z)(ke,[["render",ve],["__scopeId","data-v-09246356"]]),we=ge,Te={name:"MainPage",components:{Loader:we,HeaderBlock:_e,DiskTable:ae,DiskForm:S},mounted:function(){this.$store.dispatch("GET_DISK_INFO"),this.$store.dispatch("GET_RESOURCE",{path:""})}},be=(0,p.Z)(Te,[["render",v]]),Oe=be,ye={name:"App",components:{MainPage:Oe,AuthPage:E}},Ce=(0,p.Z)(ye,[["render",r]]),Ne=Ce;var Fe=n(124),Le=n(8534),Ge=(n(8783),n(3948),n(285),n(1637),n(65));const Re=(0,Ge.MT)({state:{pageTitle:{Type:String,default:"project"},diskInfo:{Type:Object,default:{}},diskElements:[],uploadFormReadyForSubmit:!1,uploadFormSubmitted:!0,currentPath:{Type:String,default:""},isShowUploadForm:!1,isShowLoader:!1,diskAuthentication:{Type:Object,default:{}},paginationCurrent:1,paginationAllow:0},getters:{},mutations:{CHANGE_ROOT_ELEMENT:function(e,t){e[t.name]=t.value}},actions:{LOGIN:function(e){var t=arguments;return(0,Le.Z)((0,Fe.Z)().mark((function n(){var a,o;return(0,Fe.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:{disk:"",token:""},n.prev=1,n.next=4,fetch("/api/v1/auth/login/?disk="+a.disk+"&token="+a.token,{method:"GET"});case 4:o=n.sent,o.ok?o.json().then((function(t){"error"!==t.status?(e.commit("CHANGE_ROOT_ELEMENT",{name:"diskAuthentication",value:{disk:"yandex"}}),window.location.search=window.location.hash=""):alert(t.message)})):o.json().then((function(e){return alert(e.message)})),n.next=11;break;case 8:n.prev=8,n.t0=n["catch"](1),console.log(n.t0);case 11:case"end":return n.stop()}}),n,null,[[1,8]])})))()},UNLOGIN:function(e){return(0,Le.Z)((0,Fe.Z)().mark((function t(){var n;return(0,Fe.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/v1/auth/unlogin/",{method:"GET"});case 3:n=t.sent,n.ok?n.json().then((function(t){"error"!==t.status?e.commit("CHANGE_ROOT_ELEMENT",{name:"diskAuthentication",value:{}}):alert(t.message)})):n.json().then((function(e){return alert(e.message)})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},CHECK_AUTH:function(e){return(0,Le.Z)((0,Fe.Z)().mark((function t(){var n;return(0,Fe.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/v1/auth/check/",{method:"GET"});case 3:n=t.sent,n.ok?n.json().then((function(t){"success"===t.status&&e.commit("CHANGE_ROOT_ELEMENT",{name:"diskAuthentication",value:{disk:t.disk}})})):n.json().then((function(e){return alert(e.message)})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},GET_RESOURCE:function(e){var t=arguments;return(0,Le.Z)((0,Fe.Z)().mark((function n(){var a,o,r;return(0,Fe.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=t.length>1&&void 0!==t[1]?t[1]:{path:""},e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!0}),n.prev=2,o=new FormData,o.append("page",e.state.paginationCurrent),n.next=7,fetch("/api/v1/disk/yandex/resource/"+a.path,{method:"POST",body:o});case 7:r=n.sent,r.ok?r.json().then((function(t){"error"!==t.status?(e.commit("CHANGE_ROOT_ELEMENT",{name:"diskElements",value:t.result}),e.commit("CHANGE_ROOT_ELEMENT",{name:"currentPath",value:t.currentPath}),e.commit("CHANGE_ROOT_ELEMENT",{name:"paginationCurrent",value:t.pagination.current}),e.commit("CHANGE_ROOT_ELEMENT",{name:"paginationAllow",value:t.pagination.allow})):alert(t.message)})):r.json().then((function(e){return alert(e.message)})),n.next=14;break;case 11:n.prev=11,n.t0=n["catch"](2),console.log(n.t0);case 14:e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!1});case 15:case"end":return n.stop()}}),n,null,[[2,11]])})))()},GET_DISK_INFO:function(e){return(0,Le.Z)((0,Fe.Z)().mark((function t(){var n;return(0,Fe.Z)().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,fetch("/api/v1/disk/yandex/info/",{method:"POST"});case 3:n=t.sent,n.ok?n.json().then((function(t){"error"!==t.status?e.commit("CHANGE_ROOT_ELEMENT",{name:"diskInfo",value:t.result}):alert(t.message)})):n.json().then((function(e){return alert(e.message)})),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},UPLOAD_FILE:function(e,t){var n=this;return(0,Le.Z)((0,Fe.Z)().mark((function a(){var o,r,i,s;return(0,Fe.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:for(e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!0}),a.prev=1,o=new FormData,r=t.length,i=0;i<r;i++)o.append("files[]",t[i]);return o.append("currentPath",n.state.currentPath),a.next=8,fetch("/api/v1/disk/yandex/upload/",{method:"POST",body:o});case 8:s=a.sent,s.ok?s.json().then((function(t){if("error"===t.status)return alert(t.message),e.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormSubmitted",value:!0}),e.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormReadyForSubmit",value:!1}),void e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowUploadForm",value:!1});e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowUploadForm",value:!1}),e.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormSubmitted",value:!0}),e.commit("CHANGE_ROOT_ELEMENT",{name:"uploadFormReadyForSubmit",value:!1}),e.dispatch("GET_RESOURCE",{path:n.state.currentPath}),e.dispatch("GET_DISK_INFO")})):(s.json().then((function(e){return alert(e.message)})),e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!1})),a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](1),console.log(a.t0);case 15:case"end":return a.stop()}}),a,null,[[1,12]])})))()},DELETE_FILE:function(e,t){var n=this;return(0,Le.Z)((0,Fe.Z)().mark((function a(){var o,r;return(0,Fe.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!0}),a.prev=1,o=new FormData,o.append("resource",t),a.next=6,fetch("/api/v1/disk/yandex/delete/",{method:"POST",body:o});case 6:r=a.sent,r.ok?r.json().then((function(t){"error"!==t.status?(e.dispatch("GET_RESOURCE",{path:n.state.currentPath}),e.dispatch("GET_DISK_INFO")):alert(t.message)})):(r.json().then((function(e){return alert(e.message)})),e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!1})),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](1),console.log(a.t0);case 13:case"end":return a.stop()}}),a,null,[[1,10]])})))()},DOWNLOAD_FILE:function(e,t){return(0,Le.Z)((0,Fe.Z)().mark((function n(){var a,o;return(0,Fe.Z)().wrap((function(n){while(1)switch(n.prev=n.next){case 0:return e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!0}),n.prev=1,a=new FormData,a.append("resource",t),n.next=6,fetch("/api/v1/disk/yandex/download/",{method:"POST",body:a});case 6:o=n.sent,o.ok?o.blob().then((function(e){console.log(e);var n=t.split("/").pop();-1===n.indexOf(".")&&"application/zip"===e.type&&(n+=".zip");var a=window.URL.createObjectURL(e),o=document.createElement("a");o.href=a,o.download=n,document.body.appendChild(o),o.click(),o.remove()})):o.json().then((function(e){return alert(e.message)})),n.next=13;break;case 10:n.prev=10,n.t0=n["catch"](1),console.log(n.t0);case 13:e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!1});case 14:case"end":return n.stop()}}),n,null,[[1,10]])})))()},RENAME_FILE:function(e,t){var n=this;return(0,Le.Z)((0,Fe.Z)().mark((function a(){var o,r;return(0,Fe.Z)().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!0}),a.prev=1,o=new FormData,o.append("resource",t.resource),o.append("newResourceName",t.newResourceName),a.next=7,fetch("/api/v1/disk/yandex/rename/",{method:"POST",body:o});case 7:r=a.sent,r.ok?r.json().then((function(t){"error"!==t.status?(e.dispatch("GET_RESOURCE",{path:n.state.currentPath}),e.dispatch("GET_DISK_INFO")):alert(t.message)})):(r.json().then((function(e){return alert(e.message)})),e.commit("CHANGE_ROOT_ELEMENT",{name:"isShowLoader",value:!1})),a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](1),console.log(a.t0);case 14:case"end":return a.stop()}}),a,null,[[1,11]])})))()}}});var xe=(0,a.ri)(Ne);xe.use(Re),xe.mixin({methods:{formatBytes:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;if(!+e)return"";var n=1024,a=t<0?0:t,o=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],r=Math.floor(Math.log(e)/Math.log(n));return"".concat(parseFloat((e/Math.pow(n,r)).toFixed(a))," ").concat(o[r])}}}),xe.mount("#app")}},t={};function n(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,n),r.exports}n.m=e,(()=>{var e=[];n.O=(t,a,o,r)=>{if(!a){var i=1/0;for(c=0;c<e.length;c++){for(var[a,o,r]=e[c],s=!0,l=0;l<a.length;l++)(!1&r||i>=r)&&Object.keys(n.O).every((e=>n.O[e](a[l])))?a.splice(l--,1):(s=!1,r<i&&(i=r));if(s){e.splice(c--,1);var u=o();void 0!==u&&(t=u)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[a,o,r]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{n.d=(e,t)=>{for(var a in t)n.o(t,a)&&!n.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={143:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var o,r,[i,s,l]=a,u=0;if(i.some((t=>0!==e[t]))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(l)var c=l(n)}for(t&&t(a);u<i.length;u++)r=i[u],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(c)},a=self["webpackChunkvue_project"]=self["webpackChunkvue_project"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var a=n.O(void 0,[998],(()=>n(8667)));a=n.O(a)})();
//# sourceMappingURL=app.c8d98cfc.js.map