	var info = {
			state: true,
			data:{
				Second:{
					name:"花花",
					sex:"女",
				},
				first:{
					name:"小明",
					sex:"男"
				},
				third:{
					name:"小花",
					sex:"女"
				},
				fourth:{
					name:"小龙",
					sex :"男"
				},
				third:{
					name:"小花",
					sex:"女"
				},
				fourth:{
					name:"小龙",
					sex :"男"
				}
			}
		}
		
	var str = '<%if(this.state===true){%>'+  
				 '<%for (var key in data) {%>'+ 
				 	'<li>学生名字：<%data[key].name%>"学生性别："<%data[key].sex%><a></li>'+
				'<%}%>'+
		'<%}else{%>'+
			'<li>nane</li>'+
		'<%}%>'

		function fn(str,info,box){
			var match,cursor,code;
			var re = /<%([^%>]+)%>/g;
			var reExp = /(^(if|else|swicth|of|case|break|{|}|for))(.*)?/g;
			cursor = 0;
			code = 'var arr = [];\nvar data = this.data;\n';
			var add = function(line,js){
				console.log(reExp.exec(line));
			    js?line.match(reExp)?code+=line+"\n":
			    code+="arr.push("+line+');\n':
			    code += 'arr.push("' + line.replace(/"/g, '\\"') + '");\n'
			}
			while(match = re.exec(str)){
				if(str.slice(cursor,match.index)!==""){
					add(str.slice(cursor,match.index)); 
				}
				add(match[1],true);
				cursor=match.index+match[0].length;
			}
			code+="return arr.join('');\n ";
			box.innerHTML=new Function("",code).call(info);
		}
		var box = document.querySelector(".box");
		fn(str,info,box);	