gb = function () {
    var current = null;
    var FormID = "";
    var fdTemp = "<div class='ui raised segment op-item' data-gid='{0}'><div class='floating ui green circular label op'>{1}</div> <div class='ui icon tiny button right btnDeleteQsItem' title='Delete this item.'><i class='large trash icon'></i></div> <div class='ui icon tiny button right btnCopyQsItem' title='Duplicate, Copy this item.'><i class='large copy icon'></i></div> <div class='ui tiny icon button right btnEditQsItem' title='Edit this question.'><i class='large pencil icon'></i></div>   <div class='p-gid'>{0}</div><div class='p-title'>{2}</div><div class='p-helpText'>{3}</div> <div class='qsTyp p-ctrl' data-qstyp='{4}' data-placeholder='{5}'></div></div>";
    var opt_checkbox = "<div class='column opt-checkbox'><div class='ui checkbox'><input type='checkbox' id='{0}' data-gid='{2}' name='{0}' /><label for='{0}'>{1}</label></div></div>";
    var opt_radio = "<div class='field oneline column opt-checkbox'><div class='ui radio checkbox'><input type='radio' id='{0}' data-gid='{2}' name='aaa' /><label for='{0}'>{1}</label></div></div>";
    var opt_data = {};
    var labels = {
        'home': 'home',
        'articles': 'articles',
        'contact': 'contact'
    };
    var init = function () {
    };
    var show = function () {
        current = 1;
    };
    var hide = function () {
        show();
    }
    return { 
        init: init,
        show: show,
        current: current,
        labels: labels,
        FormID: FormID,
        fdTemp: fdTemp,
        opt_checkbox: opt_checkbox,
        opt_radio: opt_radio,
        opt_data: opt_data
    }
} ();