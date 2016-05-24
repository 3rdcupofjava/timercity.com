var newTabCount = 0,
    tabs_storage = [];

$(function(){
    //adds a new tab
    $("#tab-adder").on("click",function(){
        tabs.updateStorageIndex();
        //append the new tab with its corresponding tab-pane
        $("ul.clock-tabs").append('<li class="nav-item" role="presentation"><a class="nav-link" href="#newTab'+newTabCount+'" onclick="tabs.changeAT(\'#newTab'+newTabCount+'\')" ondblclick="tabs.showRename('+newTabCount+')" aria-controls="newTab'+newTabCount+'" role="tab" data-toggle="tab">New Tab</a></li>');
        $("div.tab-content").append("<div role='tabpanel' class='tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom' id='newTab"+newTabCount+"'><div class='min_clock_holder'></div><div class='clear'></div><div class='column1 timer_holder connectedColumn'></div><div class='column2 timer_holder connectedColumn'></div><div class='column3 timer_holder connectedColumn'></div></div><script>$(function() {$('.column1,.column2,.column3').sortable({connectWith:'.connectedColumn'}).disableSelection();});</script>");

        tabs.store(newTabCount,"New Tab");
        tabs.updateTabsDroppable();

        updateSession('lst',JSON.stringify(tabs_storage));
    });

    //removes the active tab
    $("#tab-remover").on("click",function(){
        if($("ul.clock-tabs > li a.active").length > 0)//check if there is an active tab
        {
            if(confirm("Delete Active Tab?")) //if confirmed then remove the tab as well as its container for the clocks
            {
                var tabId;  //this id is to be deleted from the storage
                tabId = parseInt(activeTab.toString()[7]);
                if(!isNaN((parseInt(activeTab.toString()[8])))){
                    tabId = (tabId*10) + (parseInt(activeTab.toString()[8]));
                }
                tabs_storage[tabId] = null;

                $("ul.clock-tabs > li > a.active").remove(); //remove the active tab
                var ct = $("div.tab-content > div.tab-pane.active > div.timer_holder").children(); //get the children of the active tab-pane
                for(var i=0; i<ct.length; i++)
                {
                    removeClock(ct[i]); //call this function to clear every clock's interval under the tab to be removed
                }
                $("div.tab-content > div.tab-pane.active").remove(); //remove the active tab-pane
                updateSession('lst',JSON.stringify(tabs_storage));
            }
        }
        else    //Show alert if there is no active tab
        {
            alert("No Active Tab to delete.");
        }
        if($("div.tab-pane").length == 0) $("ul.nav.nav-tabs.clock-tabs > li#ntm").show();
    });
});

var tabs = {
    updateTabsDroppable : function(){       //updates the tabs and new tabs to be droppable
        //hide the message after adding clock
        if($("div.tab-pane").length > 0) $("ul.nav.nav-tabs.clock-tabs > li#ntm").hide();

        //process so that the clocks can be drag/drop between tabs
        $tabs = $('#tabs');
        $tab_items = $('ul:first li',$tabs).droppable({
                accept: '.connectedColumn div',
                hoverClass: 'ui-state-hover',
                drop: function (event, ui){
                    var $item = $(this);
                    var $list = $($item.find('a').attr('href')).find('.connectedColumn:first');
                    ui.draggable.hide('slow', function (){
                      $(this).appendTo($list).show('slow');
                    });
                }
            });         
    },
    showRename : function (newTab){     //shows the rename form
        $("ul.clock-tabs > li > a.active").hide(); 
        $("ul.clock-tabs > li > a.active").parent().append("<div class='rnm-holder inline-form'><input class='form-control' type='text' id='nt-name' placeholder='Tab new name'><button type='button' class='form-control btn btn-secondary' onclick='tabs.renameTab("+newTab+")' type='button'>Rename</button></div>");
    },
    renameTab : function (newTab){      //renames the tab
        if($("#nt-name").val() != ''){
            $("ul.clock-tabs > li > a.active").text($("#nt-name").val());
            tabs_storage[newTab].name = $("#nt-name").val();    //rename the entry for this tab in the tabs[] storage
            updateSession('lst',JSON.stringify(tabs_storage));
        }
        $("ul.clock-tabs > li > a.active").show();
        $("div.rnm-holder").remove();
    },
    changeAT : function (tab){      //changes the value of the activeTab
        activeTab = tab;
        //check if there are rename options that are visible and hide them
        if($("div.rnm-holder").length > 0){
            $("ul.clock-tabs > li > a.active").show();
            $("div.rnm-holder").remove();   
        }
    },
    loadTabs : function (loadedTabs,reload){            //load the tabs
        if(reload){
            this.appendTabs(loadedTabs);
        }
        else if(confirm("Load Tabs?")){
            this.appendTabs(loadedTabs);
        }
    },
    appendTabs : function (loadedTabs){                 //appends the tabs to the navigation
        for(var count in loadedTabs){                   //loop to every values of loadedTabs
            if(loadedTabs[count] != null){              //check if the current item != null
                
                this.updateStorageIndex();
                if($("ul.clock-tabs > li > a.active").length > 0){
                    //append the new tab with its corresponding tab-pane
                    $("ul.clock-tabs").append('<li class="nav-item"><a class="nav-link" href="#newTab'+newTabCount+'" onclick="tabs.changeAT(\'#newTab'+newTabCount+'\')" ondblclick="tabs.showRename('+newTabCount+')" aria-controls="newTab'+newTabCount+'" role="tab" data-toggle="tab">'+loadedTabs[count].name+'</a></li>');
                    $("div.tab-content").append("<div role='tabpanel' class='tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom' id='newTab"+newTabCount+"'><div class='min_clock_holder'></div><div class='clear'></div><div class='column1 timer_holder connectedColumn'></div><div class='column2 timer_holder connectedColumn'></div><div class='column3 timer_holder connectedColumn'></div></div><script>$(function() {$('.column1,.column2,.column3').sortable({connectWith:'.connectedColumn'}).disableSelection();});</script>");    
                }else{
                    //append the new tab with its corresponding tab-pane and make it active
                    $("ul.clock-tabs").append('<li class="nav-item"><a class="nav-link active" href="#newTab'+newTabCount+'" onclick="tabs.changeAT(\'#newTab'+newTabCount+'\')" ondblclick="tabs.showRename('+newTabCount+')" aria-controls="newTab'+newTabCount+'" role="tab" data-toggle="tab">'+loadedTabs[count].name+'</a></li>');
                    $("div.tab-content").append("<div role='tabpanel' class='tab-pane ui-tabs-panel ui-widget-content ui-corner-bottom active' id='newTab"+newTabCount+"'><div class='min_clock_holder'></div><div class='clear'></div><div class='column1 timer_holder connectedColumn'></div><div class='column2 timer_holder connectedColumn'></div><div class='column3 timer_holder connectedColumn'></div></div><script>$(function() {$('.column1,.column2,.column3').sortable({connectWith:'.connectedColumn'}).disableSelection();});</script>");
                    activeTab = "#newTab"+newTabCount;  //update the activeTab
                }
                
                this.store(newTabCount,loadedTabs[count].name);
                this.updateTabsDroppable();
            }
        }
    },
    updateStorageIndex : function(){    //updates the index for tabs_storage where it finds a NULL element
        newTabCount = 0;
        while(tabs_storage[newTabCount] != null){
            newTabCount++;
        }
    },
    store : function (index,name){      //stores the new tab
        tabs_storage[index] = {
            count: index,
            name: name
        }
    }
};

function updateSession (name, value){       //updates the session based on the name and value
    if(name == 'lst'){
        var temp=[];
        value = JSON.parse(value);
        for(var count in value){
            if(value[count] != null){   //check if the current value is null || not
                //get rid of the home tab because it will be loaded automatically
                if(value[count].name != 'Home') temp.push(value[count]);
            }
        }
        sessionStorage.setItem(name,JSON.stringify(temp));
    }
}