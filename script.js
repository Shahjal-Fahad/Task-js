//Define UI elements
let form=document.querySelector('#task_form');
let taskList=document.querySelector('ul');
let clearBtn=document.querySelector('#clear_task_btn');
let filter=document.querySelector('#task_filter');
let taskInput=document.querySelector('#new_task');

//Define event listener
form.addEventListener('submit',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTask);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);

//DEfine Functions
//Add Task

function addTask(e){
    if(taskInput.value===''){
        alert('Add a task');
    }
    else{
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value+' '));
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        taskList.appendChild(li);

        taskStoreInLocalStorage(taskInput.value);

        taskInput.value='';
    }
    e.preventDefault();
}

//Remove Task

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure to remove this task?")){
            let element=e.target.parentElement;
            element.remove();
            removeFromLs(ele);
        }

    }
}

//Clear Task

function clearTask(){
        if(confirm("Are you want to clear all Task?")){
            //simple way
            //taskList.innerHTML="";

            //faster way
            while(taskList.firstChild){

                taskList.removeChild(taskList.firstChild);
            }
            localStorage.clear();
        }    
}

//Filter Task

function filterTask(e){
    let text=e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task =>{
        let item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display="block";
        }
        else{
            task.style.display="none";

        }
    });
}

//taskStoreInLocalStorage
function taskStoreInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//getTasks
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task+' '));
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='X';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

//removeFromLocalStorage
function removeFromLs(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let li=taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((task,index) =>{
        if(li.textContent.trim()===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}