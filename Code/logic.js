	
	function init()
	{	
		localStorage["closeCount"] = 0;
	}
    //React when a browser action's icon is clicked.
    chrome.browserAction.onClicked.addListener(function(tab) {
	  
	  localStorage["closeCount"]--;
	  tabId = localStorage["ClosedTab-"+localStorage["closeCount"]];
	  tabUrl = localStorage["TabList-"+tabId];
	  chrome.browserAction.setBadgeText({text:localStorage["closeCount"] + ""});    
	  chrome.tabs.create({url: tabUrl});	  
    });

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) 
	{		
	    chrome.browserAction.setBadgeText({text:localStorage["closeCount"] + ""});
		localStorage["TabList-"+tabId] = tab.url;
		if(tab.title != null)
			localStorage["TabTitle-"+tabId] = tab.title;
		else
			localStorage["TabTitle-"+tabId] = tab.url;
			
	});
	
	chrome.tabs.onRemoved.addListener(function(tabId, info) 
	{
		localStorage["ClosedTab-"+localStorage["closeCount"]] = tabId;
		localStorage["closeCount"] ++;
	    chrome.browserAction.setBadgeText({text:localStorage["closeCount"] + ""});
	});
	
	function getLastFive()
	{		
		var returnString = "<html><body>";
		for(i = localStorage["closeCount"]-1; i >= 0; i --)
		{
			tabId = localStorage["ClosedTab-"+i];
			tabUrl = localStorage["TabList-"+tabId];
			stringForThisUrl = "<a href = \""+ tabUrl + "\" onclick=\"showUrl(\'"+tabUrl+"\')\"/>" + localStorage["TabTitle-"+tabId] + "</a>";
			returnString += stringForThisUrl;
			returnString += "<br/><br/>";			
		}
		
		returnString += "</body></HTML>"	

		return returnString;
	}
	
	// Show |url| in a new tab.
	function showUrl(url) {
		 
	  chrome.tabs.create({url: url});
	}