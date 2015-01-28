var newTabCount = 0;

$(function(){
    //adds a new tab
    $("#tab-adder").on("click",function(){
        newTabCount++;
        //append the new tab with its corresponding tab-pane
        $("ul.clock-tabs").append('<li role="presentation"><a href="#newTab'+newTabCount+'" onclick="changeAT(\'#newTab'+newTabCount+'\')" ondblclick="showRename()" aria-controls="newTab'+newTabCount+'" role="tab" data-toggle="tab">New Tab</a></li>');
        $("div.tab-content").append("<div role='tabpanel' class='tab-pane' id='newTab"+newTabCount+"'><div class='min_clock_holder'></div><div class='clear'></div><div class='column1 timer_holder connectedColumn'></div><div class='column2 timer_holder connectedColumn'></div><div class='column3 timer_holder connectedColumn'></div></div><script>$(function() {$('.column1,.column2,.column3').sortable({connectWith:'.connectedColumn'}).disableSelection();});</script>");
    });

    //removes the active tab
    $("#tab-remover").on("click",function(){
        if($("ul.clock-tabs > li.active").length > 0)//check if there is an active tab
        {
            if(confirm("Delete Active Tab?")) //if confirmed then remove the tab as well as its container for the clocks
            {
                $("ul.clock-tabs > li.active").remove(); //remove the active tab
                var ct = $("div.tab-content > div.tab-pane.active > div.timer_holder").children(); //get the children of the active tab-pane
                for(var i=0; i<ct.length; i++)
                {
                    removeClock(ct[i]); //call this function to clear every clock's interval under the tab to be removed
                }
                $("div.tab-content > div.tab-pane.active").remove(); //remove the active tab-pane
            }
        }
        else    //Show alert if there is no active tab
        {
            alert("No Active Tab to delete.");
        }
    });
});

//shows the rename field
function showRename()
{
    $("ul.clock-tabs > li.active > a").hide(); 
    $("ul.clock-tabs > li.active").append("<div class='rnm-holder'><input type='text' id='nt-name' placeholder='Tab new name'><button onclick='renameTab()' type='button'>Rename</button></div>");
}

//renames tab
function renameTab()
{
    if($("#nt-name").val() != '') $("ul.clock-tabs > li.active > a").text($("#nt-name").val());
    $("ul.clock-tabs > li.active > a").show();
    $("div.rnm-holder").remove();   
}

//changes the activeTab
function changeAT(tab)
{
    activeTab = tab;
    //check if there are rename options that are visible and hide them
    if($("div.rnm-holder").length > 0){
        $("ul.clock-tabs > li.active > a").show();
        $("div.rnm-holder").remove();   
    }
}