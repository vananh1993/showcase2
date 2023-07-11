<template>
  <transition name="modal">
    <div v-show="visible" @click="clickOutside($event)" class="modal-wrapper fixed pin-t h-screen w-screen flex items-center justify-center p-8">
      <div class="modal">
        <div :class="{ 'shake-anim': shakeIt }" class="modal-inner relative shadow-lg rounded bg-white p-8">
          <div class="modal__header">
            <slot name="header" />
          </div>
          <div class="modal__body">
            <slot name="body" v-bind="spreadedParams" />
          </div>
          <div class="modal__footer">
            <slot name="footer" />
          </div>
          <button @click="hide" class="modal-close absolute pin-t pin-r px-4 py-3 text-grey-dark hover:text-grey-darkest cursor">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props:{
    name: {
      required: true,
      type: String
    },
    show:{
      default: false,
      type: Boolean
    },
    disableClickOutside:{
      default: false,
      type: Boolean
    }
  },
  data:()=>({
    visible:false,
    shakeIt:false,
    params: {}
  }),
  watch:{
    show:{
      immediate: true,
      handler(newVal){
        this.visible = newVal
      }
    },
    visible(){
      if(this.visible){
        document.body.style.setProperty("overflow", "hidden")
      }else{
        document.body.style.removeProperty("overflow")
      }
    }
  },
  computed:{
    spreadedParams(){
      return {...this.params}
    }
  },
  methods:{
    clickOutside($event){
      if(this.disableClickOutside || $event.target !== this.$el)
      {
        if(this.$el.contains($event.target.querySelector('.modal')))
        {
          this.shakeIt = true;
          setTimeout(() => this.shakeIt = false, 500)
        }
        return;
      }
      this.hide()
    },
    hide(){
      this.$modal.hide(this.name)
    }
  },
  mounted(){
    this.$modal.$event.$on("show", (modalName,params) => {
      if(modalName === this.name){
        this.visible = true;
        this.params = params;
      }
    })
    this.$modal.$event.$on("hide", (modalName) => {
      if(modalName === this.name){
        this.visible = false;
      }
    })
  }
}
</script>
<style>
.modal:after{
  content: '';
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  transform: scale(2);
  background:rgba(0,0,0,.4);
  z-index: -1;
  pointer-events: none;
}
.modal-enter-active, .modal-leave-active{
  transition: opacity .3s ease-in-out, transform .3s ease-in-out;
}
.modal-enter, .modal-leave-active{
  opacity: 0;
  transform: scale(0.8);
}

.shake-anim {
  animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
}
@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

/*
.modal{
  height: 100vh;
  width: 100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  will-change: transform, opacity;
}
*/
</style>
