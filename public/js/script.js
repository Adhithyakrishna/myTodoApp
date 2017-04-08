$(document).ready(function() {
    
    mlabapiKey = "arl5ftCIJaqMD8ONxWhaeWRrs6v8-wH0";
    // create your own mongo account in mlab.com, replace the api key provided and you are good to go (y)

    $(".container").unbind('click').bind('click', function(event) {
        $(this).toggleClass('change');
        $("body").toggleClass('nav-collapsed');
    });

    $(".nav-holder").hover(
        function() {
            $("body").toggleClass('nav-collapsed');
        }
    );

    $(".addTaskBtn").on('click', function(event) {
        var taskCont = $(".taskContainer .taskAdder").last().clone();
        var lastCount = parseInt($(taskCont).attr("count"));
        $(taskCont).attr("count", (lastCount + 1));
        taskCont.find(".taskInput,.taskDescriptionInput").val("");
        $(".taskContainer").append(taskCont);
    });

    $(".addTaskToDb").on('click', function(event) {
        var isemptyFlag= false;
        $.each($(".taskInput,.taskDescriptionInput"), function(index, val) {
             if(!$(this).val().length)
             {
                isemptyFlag = true;
             }
        });
        if(!isemptyFlag)
        {
            $(this).html("adding...");
        }
        else{
            alert("Task / Task description cannot be empty");
        }
        var object = [];
        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var createdDate = date.getFullYear() + '-' +
            (('' + month).length < 2 ? '0' : '') + month + '-' +
            (('' + day).length < 2 ? '0' : '') + day;


        var totContent = $(".taskContainer .taskAdder");
        $.each(totContent, function(index, val) {
            var content = {};
            content.task = $(val).children(".taskInput").val();
            content.taskDescription = $(val).children(".taskDescriptionInput").val();
            content.createdAt = createdDate;
            if (content.task && content.taskDescription) {
                object.push(content);
            }
        });
        if (object.length != 0) {
            $.ajax({
                url: "https://api.mlab.com/api/1/databases/testdbfortasklist/collections/users?apiKey="+mlabapiKey,
                type: "POST",
                data: JSON.stringify(object),
                contentType: "application/json"
            }).done(function(msg) {
                window.location.pathname = "/task";
            });
        }

    });

    $(".printJira").on('click', function(event) {
        if ($(".myJiraDetails").length) {
            $(".jiraDetailHolder").detach();
        }
        var selectDate = $(".strDate").val();
        var caseValues = $(".taskDetails .taskIdentifier");
        printforJira(selectDate, caseValues);
    });

    $(".listTasks").on('click', function(event) {
        var pathtoGo = window.location.pathname;
        window.location.href = pathtoGo;
    });

    $(".findIssues").on('click', function(event) {
        if ($(".strDate").val().length == 0) {
            alert("date shouldn't be empty");
            event.preventDefault();
        }
    });
    $(".reopenTask").on('click', function(event) {
        $(window).scrollTop(0);
        $(".jiraDetailHolder").detach();
        $(this).addClass('disabled');
        var taskID = $(this).parent().parent().attr('id');
        $(".taskIdentifier,.datePicker,.buttonContainer").hide();
        $("#" + taskID).show();
        $(".taskBoxHolder").empty();

        $(".taskBoxHolder").html("<div class='commentBoxHolder' dataAttr='isReopened' id=task_" + taskID + "><input class='myTextHolder' type='textArea'></input><button class='upDateDetails'>update</button><button class='cancelInfo'>Cancel</button></div>");
        $(".upDateDetails").on('click', function(event) {
            var id = $(this).parent(".commentBoxHolder").attr('id').replace("task_", "");
            var dataAttribute = "isReopened";
            var comment = $(this).siblings('.myTextHolder').val();
            updateInfo(id, dataAttribute, comment);
        });

        $(".cancelInfo").on('click', function(event) {
            $(".commentBoxHolder").detach();
            $(".reopenTask").removeClass('disabled');
            $(".taskIdentifier,.datePicker,.buttonContainer").show();
        });

    });

    $(".taskCompleted,.taskRemoved").on('click', function(event) {
        $(this).addClass('disabled');
        var taskID = $(this).parent().parent().attr('id');
        $(this).siblings().hide();
        $(".taskIdentifier").hide();
        $("#" + taskID).show();
        $(".taskBoxHolder").empty();
        var textBoxinfo = $(this).attr("dataAttr");
        $(".taskBoxHolder").html("<div class='commentBoxHolder' dataAttr=" + textBoxinfo + " id=task_" + taskID + "><input class='myTextHolder' type='textArea'></input><button class='upDateDetails'>update</button><button class='cancelInfo'>Cancel</button></div>");
        $(".upDateDetails").on('click', function(event) {
            $(this).html("updating...")
            var id = $(this).parent(".commentBoxHolder").attr('id').replace("task_", "");
            var dataAttribute = $(this).parent(".commentBoxHolder").attr("dataattr");
            var comment = $(this).siblings('.myTextHolder').val();
            updateInfo(id, dataAttribute, comment);
        });

        $(".cancelInfo").on('click', function(event) {
            $("button").removeClass('disabled');
            $(".commentBoxHolder").detach();
            $(".taskIdentifier,.taskCompleted,.taskRemoved").show();
        });
    });

    function printforJira(date, Details) {
        $(".contentHolder").append("<div class='jiraDetailHolder'><textArea class='myJiraDetails'></textArea><button class='copyBtn'>copy</button></div>");
        if (date != "undefined" && date != "") {
            var dateString = "*Task details of " + date + "* \n";
        } else {
            var dateString = "";
        }
        var taskDetailsHeader = "||Task Detail||Task Description|| \n ";
        var taskInformation = dateString + taskDetailsHeader;
        var removeHtmlregex = /(&nbsp;|<([^>]+)>)/ig;
        $.each(Details, function(index, val) {

            taskInformation = taskInformation + "|" + $(this).find(".task").html().replace(removeHtmlregex , "").replace(/(&gt;)(?:&nbsp;|<br>)+(\s?&lt;)/g,'$1$2') + "|" + $(this).find(".taskDescription").html().replace(/(&gt;)(?:&nbsp;|<br>)+(\s?&lt;)/g,'$1$2') + "| \n ";
        });
        console.log("the task information", taskInformation);
        $(".myJiraDetails").val(taskInformation);

        $(".copyBtn").on('click', function(event) {
            $(".myJiraDetails").select();
            document.execCommand('copy');
        });
    }

    function updateInfo(identifier, attribute, comment) {
        var commentId = identifier.toString();
        var commentAttr = attribute.toString();
        var comment = comment.toString();

        var date = new Date();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var updatedDate = date.getFullYear() + '-' +
            (('' + month).length < 2 ? '0' : '') + month + '-' +
            (('' + day).length < 2 ? '0' : '') + day;

        // var date = new Date();
        // var updatedDate = date.toISOString();

        var endurl = "https://api.mlab.com/api/1/databases/testdbfortasklist/collections/users?apiKey="+mlabapiKey+"&q={_id:{$oid:%22" + commentId + "%22}}";

        var jsonObj = {};
        jsonObj[commentAttr] = true;
        if (commentAttr == "isReopened") {
            jsonObj[commentAttr] = true;
            jsonObj["isDeleted"] = false;
            jsonObj["isCompleted"] = false;
            jsonObj.updatedAt = updatedDate;
            jsonObj.taskDescription = comment;
        } else {
            jsonObj["isReopened"] = false;
            jsonObj.caseEndDetails = comment;
            jsonObj.updatedAt = updatedDate;
        }
        $.ajax({
            url: endurl,
            data: JSON.stringify({
                "$set": jsonObj
            }),
            type: "PUT",
            contentType: "application/json"
        }).done(function(msg) {
            location.reload();
        });;
    }

});