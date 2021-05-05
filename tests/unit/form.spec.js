import { mount } from "@vue/test-utils";
import Form from "@/components/Form";

describe("Form", () => {
  test("initial state is ''", () => {
    //Arrange
    const wrapper = mount(Form);
    //Assert
    expect(wrapper.html()).toContain("");
  });

  test("Link added ", async () => {
    //Arrange
    const wrapper = mount(Form);
    const button = wrapper.find("v-btn");

    //Act
    await button.trigger("click");

    //Assert
    expect(wrapper.html()).toContain("https://");
  });
});
