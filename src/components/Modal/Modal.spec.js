import Vue from "vue";
import { mount, createLocalVue } from "@vue/test-utils";
import Modal from "./Modal";
import { ModalPlugin } from "./Modal.plugin";

const localVue = createLocalVue();
const cleanDom = () => {
  document.getElementsByTagName("html")[0].innerHTML = "";
};

//uncomment next line in real env
//localVue.use(ModalPlugin);

describe("Modal.vue", () => {
  let wrapper, propsData;
  beforeEach(() => {
    propsData = {
      name: "testModalName"
    };
    wrapper = mount(Modal, {
      propsData,
      localVue
    });
  });

  afterEach(() => {
    // https://stackoverflow.com/questions/42805128/does-jest-reset-the-jsdom-document-after-every-suite-or-test
    // cleanDom();
  });

  //Clear console for mutating props warning
  afterAll(() => {
    console.clear();
    console.log("[vue-tests]: Console Cleared");
  });

  it("should'nt be rendered by default", () => {
    expect(wrapper.vm.visible).toBe(false);
    expect(wrapper.vm.show).toBe(false);
  });

  it("should render", () => {
    wrapper.setProps({ show: true });

    expect(wrapper.vm.visible).toBe(true);
    expect(wrapper.html()).toContain("modal-wrapper");
  });

  it("should not be visible when data `visible` is false", () => {
    wrapper.setProps({ show: true });

    //default
    expect(wrapper.vm.visible).toBe(true);

    //via data
    wrapper.setData({ visible: false });
    expect(wrapper.vm.visible).toBe(false);
  });

  it("should hide when close button was clicked", () => {
    wrapper.setProps({ show: true });

    //default
    const btn = wrapper.find(".modal-close");
    btn.trigger("click");
    expect(wrapper.vm.visible).toBe(false);
  });

  it("should close the modal when user clicks outside of modal", () => {
    wrapper.setProps({ show: true });

    const btn = wrapper.find(".modal-wrapper");
    btn.trigger("click");
    expect(wrapper.vm.visible).toBe(false);
  });

  it("should not close the modal when user clicks inside of modal", () => {
    wrapper.setProps({ show: true });

    const btn = wrapper.find(".modal");
    btn.trigger("click");
    expect(wrapper.vm.visible).toBe(true);
  });

  it("should work with $modal api", () => {
    //close by default
    expect(wrapper.vm.visible).toBe(false);

    //show the modal
    wrapper.vm.$modal.show("testModalName");
    expect(wrapper.vm.visible).toBe(true);

    //hide the modal
    wrapper.vm.$modal.hide("testModalName");
    expect(wrapper.vm.visible).toBe(false);
  });

  it("should not close the modal when `disableClickOutside` is true", () => {
    wrapper.setProps({
      show: true,
      disableClickOutside: true
    });

    const outsideOfModalWrapper = wrapper.find(".modal-wrapper");
    outsideOfModalWrapper.trigger("click");
    expect(wrapper.vm.visible).toBe(true);
  });

  //Uncomment line 28 otherwise doesn't work on codesandbox.io
  //remove `.skip` below
  it.skip("should toggle the `overflow` of the body", () => {
    wrapper.setProps({
      show: false
    });

    expect(document.body.style.overflow).toBeFalsy();

    wrapper.setProps({ show: true });
    expect(document.body.style.overflow).toBe("hidden");
  });
});
