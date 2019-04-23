import { shallowMount } from "@vue/test-utils";

import Index from "~/pages/index";

describe("Index", () => {
  it("renders to match snapshot", () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
