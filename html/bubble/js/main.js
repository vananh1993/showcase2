var gridSize = 10;
var iconSize = 100;
var iconList = [
   'bluetooth', 'brightness_high', 'directions_transit', 'settings',
   'event', 'headset', 'help', 'insert_chart', 'library_music'
];

const wheelStep = 28;

var html = setupHTML()
listenEvents()

setInterval(() => {
   updatePosition()
   updateIconSizes()
}, 1000/60)

function setupHTML(){
   var html = {
      container: document.querySelector('.container'),
      plane: document.querySelector('.plane'),
      appClose: document.querySelector('.app .close')
   }

   for(var i = 0; i < gridSize; i++){
      var icons = ''
      for(var o = 0; o < gridSize; o++){
         icons += `
            <div class="icon">
               <div class="draw">
                  <i class="material-icons">${utilChoose(iconList)}</i>
               </div>
            </div>`
      }
      html.plane.innerHTML += `<div class="row">${icons}</div>`
   }
   html.icons = document.querySelectorAll('.icon')
   return html
}

function listenEvents(){
   var that = this
   for(var i = 0; i < html.icons.length; i++){
      html.icons[i].addEventListener('mouseup', function(e){
         that.eventIconClick(this, e)
      })
   }
    // html.container.addEventListener('mousedown', function(e){ eventMouseDown(getPosition(e)) });
    // html.container.addEventListener('mouseup', function(e){ eventMouseUp(getPosition(e)) });
    // html.container.addEventListener('mouseleave', function(e){ eventMouseUp(getPosition(e)) });
    // html.container.addEventListener('mousemove', function(e){ eventMouseMove(getPosition(e)) });
    $(html.container).on('mousedown vmousedown', (e) => {
        eventMouseDown(getPosition(e));
    });
    $(html.container).on('mouseup vmouseup', (e) => {
        eventMouseUp();
    });
    $(html.container).on('mousemove vmousemove', (e) => {
        // $('.number').html(e.pageX + "-" + e.pageY);
        eventMouseMove(getPosition(e));
    });
    // html.container.addEventListener('touchmove', function(e){
    //     // console.log(e);
    //     eventTouchMove(e);
    //     // alert(1);
    //     $('.number').html(e.pageX + "-" + e.pageY);
    //     // alert(1);
    // });
    html.appClose.addEventListener('click', function(e){ eventCloseApp() });
    html.container.addEventListener('mousewheel', function(e){
        let wheel = e?.deltaY || 0;

        if (wheel < 0) {
           return eventWheelUp();
        }

        eventWheelDown();
   });
}

// function eventTouchMove(pos) {
//     mouse.state = 'touch';
//     mouse.pos.offset = utilTransfer(pos);
//     mouse.pos.move = utilTransfer(pos);
//     console.log(mouse.pos);
//     // mouse.pos.current.x = e.pageX;
//     // mouse.pos.current.y = e.pageY;
//
// }

function eventWheelUp() {
    // console.log(html.container.getBoundingClientRect().bottom, mouse.pos.current.y - wheelStep);
    mouse.state = 'wheel';
    mouse.pos.move.y = verticalLimit(mouse.pos.current.y - wheelStep);
    // mouse.pos.move.y = Math.max(-html.container.getBoundingClientRect().bottom + 150, mouse.pos.current.y - wheelStep);
    // mouse.pos.move.y = mouse.pos.current.y - wheelStep;
}

function eventWheelDown() {
    mouse.state = 'wheel';
    mouse.pos.move.y = verticalLimit(mouse.pos.current.y + wheelStep);
    // mouse.pos.move.y = Math.min(html.container.getBoundingClientRect().top - 150, mouse.pos.current.y + wheelStep);
}

function eventMouseUp(pos){
    if(mouse.state == 'up') return;
    mouse.state = 'up';
}

function eventMouseDown(pos){
   mouse.state = 'down';
   mouse.pos.offset = utilTransfer(pos);
   mouse.pos.move = utilTransfer(pos);
}

function eventMouseMove(pos){
   if(['up', 'wheel'].includes(mouse.state)) {
       return;
   }

   mouse.state = "move";
   mouse.pos.move = utilTransfer(pos);
   // mouse.pos.move.y = Math.min(html.container.getBoundingClientRect().top - 150, utilTransfer(pos).y);
}

function eventIconClick(ele, event){
   if(mouse.state === 'move') return
   ele.classList.add('open')
   html.container.classList.add('open')

   var box = ele.getBoundingClientRect()
   var contBox = html.container.getBoundingClientRect()
   mouse.pos.click = {
      x: mouse.pos.current.x - (box.left - contBox.left) + contBox.width/2 - box.width/2,
      y: mouse.pos.current.y - (box.top - contBox.top) + contBox.height/2 - box.height/2
   }
}

function eventCloseApp(pos){
   html.container.classList.remove('open')
   for(var i = 0; i < html.icons.length; i++){
      html.icons[i].classList.remove('open')
   }
}

function horizontalLimit(x) {
    const boxPlane = html.plane.getBoundingClientRect();
    const boxContainer = html.container.getBoundingClientRect();

    return Math.min(Math.max(boxContainer.width / 2 - boxPlane.width + iconSize , x), boxContainer.width / 2 - iconSize );
}

function verticalLimit(y) {
    const boxPlane = html.plane.getBoundingClientRect();
    const boxContainer = html.container.getBoundingClientRect();

    return Math.min(Math.max(boxContainer.height / 2 - boxPlane.height + iconSize , y), boxContainer.height / 2 - iconSize );
}

var mouse = {
   state: 'up',
   pos: {
      offset: {x: 0, y: 0},
      move: {x: 0, y: 0},
      current: {x: 0, y: 0},
      click: {x: 0, y: 0},
      old: {x: 0, y: 0}
   }
};

function updatePosition(){
    if(mouse.state == "move"){
        mouse.pos.current.x = horizontalLimit(mouse.pos.current.x + mouse.pos.move.x - mouse.pos.offset.x);
        mouse.pos.current.y = verticalLimit(mouse.pos.current.y + mouse.pos.move.y - mouse.pos.offset.y);
        // mouse.pos.current.x += mouse.pos.move.x - mouse.pos.offset.x;
        // mouse.pos.current.y += mouse.pos.move.y - mouse.pos.offset.y;
        mouse.pos.offset = utilTransfer(mouse.pos.move);
        mouse.pos.click = utilTransfer(mouse.pos.current);
    }

   if (mouse.state === 'wheel') {
       mouse.pos.current.y = mouse.pos.move.y;
   }

   if (mouse.state === 'touch') {
       // $('.number').html(mouse.pos.current.x - mouse.pos.current.x);
       // $('.number').html(mouse.pos.move.x - mouse.pos.offset.x);
       mouse.pos.current.x += mouse.pos.move.x - mouse.pos.offset.x;
       mouse.pos.current.y += mouse.pos.move.y - mouse.pos.offset.y;
       mouse.pos.offset = utilTransfer(mouse.pos.move);
       mouse.pos.click = utilTransfer(mouse.pos.current);
   }

   if(mouse.state == "up"){
      mouse.pos.current.x -= (mouse.pos.current.x - mouse.pos.click.x)/10;
      mouse.pos.current.y -= (mouse.pos.current.y - mouse.pos.click.y)/10;
   }

   // console.log(html.container.getBoundingClientRect().left, html.container.getBoundingClientRect().right, mouse.pos.current.x);

   var transform = `translateX(${mouse.pos.current.x}px) translateY(${mouse.pos.current.y}px)`
   html.plane.style.transform = transform
}

function updateIconSizes(){
   for(var i = 0; i < html.icons.length; i++){

      var contBox = html.container.getBoundingClientRect()
      var iconBox = html.icons[i].getBoundingClientRect()

      var iconCenter = {
         x: iconBox.left+iconBox.width/2,
         y: iconBox.top+iconBox.height/2
      }

      var contCenter = {
         x: contBox.left + contBox.width/2,
         y: contBox.top + contBox.height/2
      }

      var center = {
         x: (contCenter.x - iconCenter.x),
         y: (contCenter.y - iconCenter.y)
      }

      var distance = Math.min(Math.floor(utilDistance({x:0, y:0}, center)), contBox.width/2)
      var percent = Math.min((1 - distance/(contBox.width/2))*1.5, 1)

      var iconDraw = html.icons[i].getElementsByClassName('draw')[0]

      iconDraw.style.transform = `translateX(-50%) translateY(-50%) scale(${percent}, ${percent})`
      iconDraw.style.opacity = percent
   }
}

function getPosition(e){
   var box = html.container.getBoundingClientRect();

   return {
      x: e.clientX - box.left,
      y: e.clientY - box.top
      // y: Math.max(Math.min(box.top - 150, e.clientY - box.top), -box.bottom + 150)
   }
}

function utilChoose(arr){
   return arr[Math.floor(Math.random()*arr.length)]
}

function utilTransfer(obj){
   return JSON.parse(JSON.stringify(obj))
}

function utilDistance(pos1, pos2){
   return Math.sqrt(Math.pow((pos2.x - pos1.x),2) + Math.pow((pos2.y - pos1.y),2))
}
