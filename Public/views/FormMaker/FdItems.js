FdItems = function () {

    var init = function () {

        $.post(host + "/Sync/Fds", { FsID: gb.FormID }, function (rs) {
            var ss = "", c = {};
            for (var d in rs) {
                c = rs[d]; //console.log(gb.fdTemp, c);
                ss += String.format(gb.fdTemp, c.GID, c.SortNo, c.Title, c.HelpText, c.QsTyp, c.Placeholder);
            }
            $("#QuestionList").html(ss);

            ShowFdOptionData(); /* Get All Fd Options Data Rows. */


        });
    };

    var MulitController = function (option_list) {
        var bb = "<div class='ui tiny basic button' id='btnAddOpt'><i class='icon user'></i>Add a Option</div>";
        $(".QSCtrl").html("");

        var ss = "";
        if (option_list) {
            $(option_list).each(function (i, n) {
                var op = $(n),
                    id = op.find("input").attr("data-gid"),
                    lb = op.find("label").html(),
                    tmp = $(".opt-tmp").clone().removeClass("opt-tmp").find("input")
                                                .attr("data-opt_id", id)
                                                .val(lb).parent();
                //console.log(id, lb);
                $(".QSCtrl").append(tmp);
            });
        }

        $(".QSCtrl").append(bb)
            .css("border", "solid 1px green")
            .sortable().disableSelection()
            .on("sortupdate", function (e, ui) {
                var me, ss = "", gid = "", k = 0, v = "";
                $(this).find(".column").each(function (i, n) {
                    me = $(n).find("input");
                    gid = me.attr("data-opt_id");
                    v = me.val();
                    k = i + 1;
                    ss += gid + ":" + k + ":" + v + ";";
                });
                //console.log(ss);
                SaveOptionsSort(ss);
            });

        var i = 0;
        $("#btnAddOpt").on("click", function () {
            i += 1;
            var tmp = $(".opt-tmp").clone().removeClass("opt-tmp").attr("id", "opt-" + i);
            $("#btnAddOpt").before(tmp);
            $(".fdop").focusout(function () {
                var FdGID = $("#FdGID").val(),
                    opt_id = $(this).attr("data-opt_id"),
                    txt = $(this).val();
                console.log("focusout", opt_id);
                FdItems.FdOptionSave($(this), FdGID, opt_id, txt);
            });
        });
    };

    var ShowFdOptionData = function () {
        $.post(host + "/Sync/ShowFdOptions", { FsID: gb.FormID }, function (rs) {
            gb.opt_data = rs;
            var qstyp = "", FdID = "", placeholder = "", opt_data = gb.opt_data, d, dd, ss = "";

            $(".qsTyp").each(function (i, n) {
                qstyp = $(n).data("qstyp");
                placeholder = $(n).data("placeholder");
                FdID = $(n).parent().data("gid");
                //console.log(FdID, typeof (FdID), qstyp, placeholder, "opt_data:", opt_data);

                if (qstyp === "Text") {
                    d = $(".hidden.text1").clone().removeClass("hidden").find("input").attr("placeholder", placeholder);
                    $(n).append(d);
                }

                if (qstyp === "TextArea") {
                    d = $(".hidden.areatxt").clone().removeClass("hidden").find("textarea").attr("placeholder", placeholder);
                    $(n).append(d);
                }

                if (qstyp === "Checkboxs") {
                    ss = "";
                    for (var c in opt_data) {
                        dd = opt_data[c]; //console.log(dd.FdID);
                        if (FdID === dd.FdID) {
                            //console.log(FdID, dd.FdID, dd.Text, dd.Value);
                            ss += String.format(gb.opt_radio, dd.Value, dd.Text, dd.GID);
                        }
                    }
                    $(n).html(ss);
                }

                if (qstyp === "MultiChoice") {
                    ss = "";
                    for (var c in opt_data) {
                        dd = opt_data[c]; //console.log(dd.FdID);
                        if (FdID === dd.FdID) {
                            //console.log(FdID, dd.FdID, dd.Text, dd.Value);
                            ss += String.format(gb.opt_checkbox, dd.Value, dd.Text, dd.GID);
                        }
                    }
                    $(n).html(ss);
                }
            });

        });
    };

    var qsControl = {
        "Text": function () { $(".QSCtrl").html("<div class='text1'></div>"); },
        "PText": function () { $(".QSCtrl").html("<div class='text2'></div>"); },
        "Checkboxs": MulitController,
        "MultiChoice": MulitController
    };

    var getFdCtrl = function () {
        return {
            FormID: gb.FormID,
            GID: $("#FdGID").val(),
            Title: $("#Title").val(),
            QsTyp: $("#ddl_QsTyp").val(),
            HelpText: $("#HelpText").val(),
            SortNo: $("#SortNo").html(),
            IsRequire: ($("#IsRequire").val() == "on") ? "1" : "",
            IsOneLine: $("#IsValidation").val()
        }
    };

    var setFdCtrl = function (fdID) {
        $.post(host + "/Sync/GetOneFds", { FdID: fdID }, function (rs) {

            var d = rs;
            //console.log(d.QsTyp);
            $("#FdGID").val(d.GID);
            $("#Title").val(d.Title);
            $("#ddl_QsTyp").val(d.QsTyp);
            $("#HelpText").val(d.HelpText);
            $("#SortNo").html(d.SortNo);

            //$("#IsRequire").val() == "on") ? "1" : "",
            //$("#IsValidation").val();
        });
    };

    var FdSave = function () {
        $.post(host + "/Sync/FdSave", getFdCtrl(), function (rs) {
            init();
        });
    };

    var FdSaveInit = function () {
        $.post(host + "/Sync/FdSave", getFdCtrl(), function (rs) {
            $("#FdGID").val(rs);
        });
    };

    var Delete = function (gid) {
        $.post(host + "/Sync/FdDelete", { gid: gid }, function (rs) {
            init();
        });
    };

    var FdOptionSave = function (self, FdID, FdoID, txt) {
        var fdo = { FdID: FdID, GID: FdoID, Text: txt };
        var dt = new Date();
        $.post(host + "/Sync/FdOptionSave?t=" + dt.getTime(), { FdID: FdID, GID: FdoID, Text: txt }, function (rs) {
            self.attr("data-opt_id", rs);
        });
    }

    var RemoveOption = function (OptionID) {
        $.post(host + "/Sync/RemoveOption", { OptionID: OptionID }, function (rs) {

        });
    }

    var SaveSort = function (sort_list) {
        $.post(host + "/Sync/SaveSort", { SortList: sort_list }, function (rs) {

        });
    }

    var SaveOptionsSort = function (sort_list) {
        $.post(host + "/Sync/SaveOptionsSort", { SortList: sort_list }, function (rs) {

        });
    }

    var UserSelectedAnswer = function (gid) {
        $.post(host + "/Sync/UserSelectedAnswer", { FsID: gid }, function (rs) {
            //console.log(rs);
            var fdid = "", c, d, value = "", qstyp = "", me;
            for (d in rs) {
                c = rs[d];
                fdid = c.FdID;
                value = c.ValueID;
                qstyp = c.QsTyp;

                me = $("div.segment.op-item-real[data-fdid='" + fdid + "']");
                //console.log(fdid, qstyp, value, ".ui.checkbox[id='" + value + "']");
                if (qstyp === "MultiChoice" || qstyp === "Checkboxs") {
                    me.find(".ui.checkbox input[id='" + value + "']").css("border", "solid 2px red").attr("checked", "checked");
                }
                else if (qstyp === "Text") {
                    me.find("input[cname='cmp-" + fdid + "']").val(value);
                }
                else if (qstyp === "TextArea") {
                    me.find("textarea[cname='cmp-" + fdid + "']").val(value);
                }
            }

        });
    }

    var UserSelectedAnswerStatic = function (gid, totalcc) {
        $.post(host + "/Sync/UserSelectedAnswerStatic", { FsID: gid }, function (rs) {
            //console.log(rs);
            var c, d, me
                    , fdid = ""
                    , multis = rs["multis"]
                    , vid = ""
                    , txts = rs["txts"]
                    , FdID = ""
                    , dscr = ""
                    , icc = 0
                    , itt = 0
                    , iratio = 0.0
            ;

            for (d in multis) {
                c = multis[d];
                vid = c.VID;
                icc = parseInt(c.CC);
                itt = parseInt(totalcc);
                iratio = icc / itt * 100;
                $("div.cc[id='" + vid + "']").html(iratio.toFixed(1)+"%");
            }

            for (d in txts) {
                c = txts[d];
                fdid = c.FdID;
                dscr = c.dscr;

                $("div[cname='cmp-" + fdid + "']").append("<div class='v-dscr'>" + dscr + "</div>");
            }
            $('#example1').progress();
        });
    }
    /* 這邊等於是Public */
    return {
        init: init,
        qsControl: qsControl,
        FdSave: FdSave,
        FdSaveInit: FdSaveInit,
        FdOptionSave: FdOptionSave,
        Delete: Delete,
        setFdCtrl: setFdCtrl,
        RemoveOption: RemoveOption,
        SaveSort: SaveSort,
        UserSelectedAnswer: UserSelectedAnswer,
        UserSelectedAnswerStatic: UserSelectedAnswerStatic
    };
} ();