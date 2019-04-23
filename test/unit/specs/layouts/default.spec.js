import { shallowMount } from "@vue/test-utils";

import Default from "~/layouts/default";

describe("Default layout", () => {
  it("renders to match snapshot", () => {
    const wrapper = shallowMount(Default);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
