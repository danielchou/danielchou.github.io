function JSN(root) {
    var feed = root.feed,
		entries = feed.entry || [],
		html = ['<table class="ui blue compact table">'],
		entry,who,adult,kid1,kid2,note;
	html.push('<thead><tr><th>姓名</th><th>大人</th><th>小孩佔位</th><th>小孩不佔位</th></tr></thead><tbody>');
    for (var i = 0; i < entries.length; ++i) {
      entry = entries[i];
      who = (entry['gsx$我是誰']) ? entry['gsx$我是誰'].$t : "";
	  adult = (entry['gsx$人數統計大人包含自己']) ? entry['gsx$人數統計大人包含自己'].$t : "";
      kid1 = (entry['gsx$人數統計孩童佔位']) ? entry['gsx$人數統計孩童佔位'].$t : "";
      kid2 = (entry['gsx$人數統計孩童不佔位2歲以下']) ? entry['gsx$人數統計孩童不佔位2歲以下'].$t : "";
      kid1 = (kid1 == "") ? "--" : kid1;
      html.push('<tr><td>', who , '</td><td>', adult, '</td><td>', kid1 ,'</td><td>0', kid2 ,'</td><td>', note ,'</td></tr>');
    }

    html.push('</tbody></table>');
    $("#members").html(html.join(""));
  }
