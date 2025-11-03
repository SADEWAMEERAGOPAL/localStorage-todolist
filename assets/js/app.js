let cl=console.log;

const todoForm=document.getElementById("todoForm");
const todoFormControl=document.getElementById("todoFormControl");
const todoList=document.getElementById("todoList");
const addtodobtn= document.getElementById("addtodobtn");
const updatetodobtn= document.getElementById("updatetodobtn");


let todoArr;
if(localStorage.getItem("todoArr")){
    todoArr=JSON.parse( localStorage.getItem("todoArr"))
}else{
    todoArr=[]
}



const uuid = () => {
  return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
    /[xy]/g,
    character => {
      const random = (Math.random() * 16) | 0
      const value = character === 'x' ? random : (random & 0x3) | 0x8
      return value.toString(16)
    }
  )
}
cl( uuid())

const createList=(arr)=>{
  let  result="";
arr.forEach(todo=>{
  result+=`<li class="form-group-item d-flex justify-content-between" id="${todo.todoId}">
                                <strong>${todo.todoitem}</strong>
                                <div>
                                    <i class=" fa-solid fa-pen-to-square text-success" onclick="EDIT_OBJ(this)"></i>
                                    <i class="fa-solid fa-trash text-danger" onclick="REMOVE_OBJ(this)"></i>
                                </div>
                            </li>`
})

todoList.innerHTML=result;
}
createList(todoArr)


//EDIT_OBJ
const EDIT_OBJ=(ele)=>{
  //cl("click")
  let EDIT_ID=ele.closest('li').id;
  cl(EDIT_ID)

  localStorage.setItem("EDIT_ID", EDIT_ID)

  let eit_obj=todoArr.find(todo=>todo.todoId === EDIT_ID)
  cl(eit_obj)
  
todoFormControl.value=eit_obj.todoitem

  addtodobtn.classList.add('d-none');
  updatetodobtn.classList.remove('d-none');
}


//Onupdate_obj

const Onupdate_obj=()=>{
    let update_id= localStorage.getItem("EDIT_ID")

    let UPDATE_OBJ={
        todoitem:todoFormControl.value,
        todoId:update_id,
    }

    cl(UPDATE_OBJ)
   todoForm.reset() 

   let getindex=todoArr.findIndex(todo=>todo.todoId===update_id)
   cl(getindex)

   todoArr[getindex]=UPDATE_OBJ;

   localStorage.setItem("todoArr", JSON.stringify(todoArr))

   let li=document.getElementById(update_id);
   li.firstElementChild.textContent=UPDATE_OBJ.todoitem;


   addtodobtn.classList.remove('d-none');
  updatetodobtn.classList.add('d-none');

  Swal.fire({
  title: "Do you want to save the changes?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Save",
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire("Saved!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not saved", "", "info");
  }
});
}


//REMOVE_OBJ
const REMOVE_OBJ=(ele)=>{
swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {       

    Swal.fire({
  title: "your todoitem deleted successfully",
  icon: "success",
  timer: 3000,
  draggable: true
});


let REMOVE_ID = ele.closest("li").id;
let getindex = todoArr.findIndex(todo => todo.todoId === REMOVE_ID);

todoArr.splice(getindex, 1)

localStorage.setItem("todoArr", JSON.stringify(todoArr));

ele.closest("li").remove();
}
})

}


const OntodoSubmit=(eve)=>{
  eve.preventDefault();
  //cl("click")


  let create_ob={
    todoitem: todoFormControl.value,
    todoId: uuid(), 
  }
 

  todoForm.reset();


  todoArr.push(create_ob)

  localStorage.setItem("todoArr", JSON.stringify(todoArr))

  let li=document.createElement('li');
  li.className="form-group-item d-flex justify-content-between";
  li.id=create_ob.todoId;
 li.innerHTML=`
                      <strong>${create_ob.todoitem}</strong>
                           <div>
                                    <i class=" fa-solid fa-pen-to-square text-success" onclick="EDIT_OBJ(this)"></i>
                                     <i class="fa-solid fa-trash  text-danger" onclick="REMOVE_OBJ(this)"></i>
                            </div>`
  todoList.append(li)

  Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your data has been saved",
  showConfirmButton: false,
  timer: 1500
});
}



todoForm.addEventListener("submit", OntodoSubmit)
updatetodobtn.addEventListener("click", Onupdate_obj)