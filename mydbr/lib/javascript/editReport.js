$(document).ready(function(){$(".entryform tbody tr:first td").addClass("pad_top_10");$(".entryform tr:last td").addClass("pad_bot_10");$("#url").css("display","none");$("#urlshow").click(function(){$("#url").toggle("blind")});$("#sync").click(function(){window.open($(this).attr("data-url"))});$("#copyr").click(function(){copy_report()});$("#editr,#editok").click(function(){EditReport(this,this.id=="editr")});$(".param_other").dropdownchecklist();$(".ui-dropdownchecklist-dropcontainer-wrapper,.ui-dropdownchecklist-dropcontainer").css("width","auto").css("height","auto");$('.ui-dropdownchecklist-item > input[value="title"]').each(function(){var id=$(this).closest(".rparam_row").attr("data-id"),dt=$(this).closest(".rparam_row").find('select > option[value="title"]').attr("data-title");dt=dt===undefined?"":unicodeToChar(dt);$(this).next().css("margin-right","5px").after('<input class="param_title_input" name="param_title'+id+'">');$(this).nextAll(".param_title_input").val(dt)});$('.ui-dropdownchecklist-item > input[value="year"]').each(function(){var id=$(this).closest(".rparam_row").attr("data-id"),dt=$(this).closest(".rparam_row").find('select > option[value="year"]').attr("data-year");$(this).next().css("margin-right","5px").after('<input class="param_year_input" name="param_year'+id+'">');$(this).nextAll(".param_year_input").val(dt).attr("title","1950:2050 / -100:+0")});$('.ui-dropdownchecklist-item > input[value="width"]').each(function(){var s,sel=0,opt,id=$(this).closest(".rparam_row").attr("data-id"),dt=$(this).closest(".rparam_row").find('select > option[value="width"]').attr("data-width");$(this).next().css("margin-right","5px").after('<input class="param_width_input" name="param_width'+id+'">');opt="";["ex","rem","pt","ch","px","em"].forEach(function(e){s="";if(sel==0){if(typeof dt!=="undefined"&&dt.indexOf(e)>0){sel=1;s=" selected"}}opt="<option"+s+">"+e+"</option>"+opt});$(this).next().next().css("margin-right","5px").after('<select class="param_unit" name="param_unit'+id+'">'+opt+"</select>");if(typeof dt=="undefined"||parseFloat(dt)<=0){dt=""}else{dt=parseFloat(dt)}$(this).nextAll(".param_width_input").val(dt)});$(".param_width_input").focus(function(){if(!$(this).prevAll('input[type="checkbox"]').is(":checked")){$(this).prevAll('input[type="checkbox"]').click();$(this).focus()}});$("#rname").focus();UserSearch("")});function copy_report(){jPrompt(mydbr_loc["MYDBR_EDITREPORT_COPY_NAME"],$("#dbrreportprefix").val(),mydbr_loc["MYDBR_EDITREPORT_COPY"],copyreport)}function copyreport(r){if(!r)return;$.ajax({url:"apps_v/copy_report.php",type:"post",data:{old_r:$("#spname").val(),new_r:r,csrf_token:csrf_token_get()},success:function(ret_json){var m,new_id=parseInt(ret_json.new_id,10);if(new_id>0){if(window.confirm(ret_json.msg)){m=gup(window.location.href,"m");if(m!==""){m="m="+m}window.location="index.php?a=editreport&"+m+"&r="+new_id}}else{alert(ret_json.msg)}}})}function EditReport(obj,highlite){var url=$(obj).attr("data-url");$.ajax({url:"apps_v/editReportInfo.php",type:"post",data:$("#myform").serialize()+"&csrf_token="+csrf_token_get(),success:function(data){if(data!="OK"){if(data){alert(data)}}else{ReportParamsSet(url);if(highlite){$(".ok_icon_param").show().fadeOut("fast")}}}});return false}function UserSearch(name){$.ajax({url:"apps_v/er_usersearch.php",type:"post",data:{report:$("#reportid").val(),search:name},success:function(data){$("#userlist").html(data)}});return false}function UserPrivSet(chk,user,report,auth){var add=0;if(chk.checked){add=1}$.ajax({url:"apps_v/editReportUsr.php",type:"post",data:{add:add,user:user,report:report,auth:auth,csrf_token:csrf_token_get()}});return false}function GroupPrivSet(chk,group,report){var add=0;if(chk.checked){add=1}$.ajax({url:"apps_v/editReportGrp.php",type:"post",data:{add:add,group:group,report:report,csrf_token:csrf_token_get()}});return false}function ReportParamsSet(url){$.ajax({url:"apps_v/editReportParam.php",type:"post",data:$("#procparams").serialize()+"&csrf_token="+csrf_token_get(),success:function(data){if(url){window.location.href=url}}});return false}function SetPublic(chk,user){var grant=chk.checked?1:0;$.ajax({url:"apps/grantp.php",type:"post",data:{user:user,reportid:$("#reportid").val(),grant:grant,csrf_token:csrf_token_get()},success:function(data){if(data!=""){alert(data)}}})}function SaveExts(Exts){var extension="",i;for(i=0;i<Exts;i++){if(document.getElementById("extension"+i).checked){if(extension!=""){extension+=","}extension+=document.getElementById("extension"+i).value}}$.ajax({url:"apps/reportexts.php",type:"post",data:{report:document.forms["myform"].spname.value,extensions:extension,csrf_token:csrf_token_get()}})}