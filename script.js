    function toggleMenu(){
      const nav = document.querySelector('nav ul');
      nav.classList.toggle('active');
    }
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const filter = document.getElementById("filter");

async function getTodos() {
  const res = await fetch("https://dummyjson.com/todos");
  const data = await res.json();
  console.log("📌 API todos:", data.todos);

  taskList.innerHTML = "";
  data.todos.slice(0,10).forEach(todo => { 
    createTask(todo.todo, todo.completed, todo.id);
  });
}

async function createTodoAPI(text) {
  fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: text,
    completed: false,
    userId: 1,
  })
})
.then(res => {
  const data = res.json()
  createTask(data.todo, data.completed,data.id);
})
.then(console.log);
}

fetch('https://dummyjson.com/todos/1', {
  method: 'PUT',
  headers: { 'Content-Typed': 'application/json' },
  body: JSON.stringify({
    completed: false,
  })
})
.then(res => res.json())
.then(console.log);

async function deleteTodoAPI(id, li) {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  console.log("🗑️ Removido na API:", data);
  li.remove();
}

function createTask(text, isComplete = false, id = null) {
  const li = document.createElement("li");
  li.classList.add("task");
  if (isComplete) li.classList.add("completa");

  const span = document.createElement("span");
  span.textContent = text;

    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        e.preventDefault();
        const target = document.querySelector(a.getAttribute('href'));
        if(target){
          target.scrollIntoView({behavior:'smooth', block:'start'});
          document.querySelector('nav ul').classList.remove('active');
        }
      })
    })

    function updateScrollProgress(){
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
  const btns = document.createElement("div");
  btns.classList.add("btns");

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.classList.add("done-btn");
  doneBtn.onclick = () => {
    li.classList.toggle("completa");
    if (id) updateTodoAPI(id, li.classList.contains("completa"));
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    if (id) deleteTodoAPI(id, li);
  };
   
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    if (id) editTodoAPI(id, li);
  };
  li.appendChild(editBtn);
  document.querySelector("#taskList").appendChild(li);

  btns.appendChild(doneBtn);
  btns.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(btns);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    createTodoAPI(text);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = taskInput.value.trim();
    if (text) {
      createTodoAPI(text);
      taskInput.value = "";
}
  }
});

    function handleHeaderScroll(){
      const header = document.querySelector('header');
      if(window.scrollY > 100){
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
filter.addEventListener("change", applyFilter);
function applyFilter() {
  const tasks = taskList.childNodes;
  tasks.forEach(task => {
    if (task.nodeType === 1) {
      switch (filter.value) {
        case "todos":
          task.style.display = "flex";
          break;
        case "concluidos":
          task.style.display = task.classList.contains("completa") ? "flex" : "none";
          break;
}
}
  });
}

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.card, .project, .skill');
      animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });

      window.addEventListener('scroll', () => {
        updateScrollProgress();
        handleHeaderScroll();
      });
        
      document.addEventListener('click', (e) => {
        const nav = document.querySelector('nav ul');
        const toggle = document.querySelector('.mobile-toggle');
        if(!nav.contains(e.target) && !toggle.contains(e.target)){
          nav.classList.remove('active');
        }
      });

      const heroTitle = document.querySelector('.intro h1');
      if(heroTitle){
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
          if(i < text.length){
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
          }
        };
        setTimeout(typeWriter, 500);
      }
    });

    document.querySelectorAll('.project').forEach(project => {
      project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-8px) scale(1.02)';
      });
      project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0) scale(1)';
      });
    });

    document.querySelectorAll('.btn, .cta').forEach(btn => {
      btn.addEventListener('click', function(e){
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  
window.onload = getTodos;
