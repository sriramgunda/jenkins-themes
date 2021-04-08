//var fs = require('fs');

function jenkinsFunc(){
    if(window.location.href.endsWith("console") || window.location.href.endsWith("consoleFull")){

        var htmlContent = '<html>Whatever</html>';
        var errorflag = 'false';
/*
        fs.writeFile('tr.html', htmlContent, (error) => { if (err) throw err;
            console.log('The file has been saved!'); 
        });
        */
        //alert("console page");
        //alert(document.getElementsByClassName('console-output')[0].getElementsByTagName('span'));

        // Create custom url div element
        var customLink = document.createElement('div');
        customLink.classList.add('task');
        //customLink.innerHTML = 'Custom URL';
        document.querySelector('#tasks').appendChild(customLink);

        content = document.getElementsByClassName('console-output')[0].textContent;
        content = String(content).split("\n");
        //alert(content);
        content.forEach(getErrorFunc);
        function getErrorFunc(item, index){
            if(String(item).startsWith('ERROR: ') || String(item).startsWith('[ERROR]')){
                //alert(item);
                let errEle = document.createElement('span');
                errEle.classList.add('console-error-element');
                errEle.innerHTML = String(item);
                document.querySelector('.console-output').appendChild(errEle);
                //customLink.appendChild(document.createElement('br'));
                errorflag = 'true'
                
            }
            let target_msg = "ANALYSIS SUCCESSFUL, you can browse";
            let target_msg2 = "Status code of Jenkins instance";
            if(String(item).includes(target_msg)){
                customLink.appendChild(document.createElement('br'));
                let anchor = document.createElement('a');
                anchor.classList.add('task-link');
                anchor.href = String(item).split(target_msg)[1];
                anchor.target = '_blank';
                anchor.innerText = 'Test URL';
                customLink.appendChild(anchor);
            }
        }
        if(errorflag == 'true'){
            let anchor1 = document.createElement('a');
            anchor1.classList.add('task-link');
            anchor1.href = 'http://test.com';
            anchor1.target = '_blank';
            anchor1.innerText = 'Troubleshooter';
            customLink.appendChild(anchor1);
        }
               


        let spanElements = document.getElementsByClassName('console-output')[0].childNodes;
        //alert(spanElements);
        Array.from(spanElements).forEach(function(element) {
            //element.style.backgroundColor = 'red';
            //alert(element.textContent);
            if(String(element.textContent).startsWith('ERROR:')){
                //alert(element);
            }
        });
    } else {
        document.getElementById('description').innerHTML = "Hello customized Jenkins";
    }
}

if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', jenkinsFunc);
} else {
    alert('Not loaded properly');
}