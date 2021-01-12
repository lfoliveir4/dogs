import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("useForm", () => {
  it("should be able to return value", () => {
    const { result } = renderHook(() => useForm());

    expect(result.current.value).toBe("");
  });

  it("should be able to return setValue", () => {
    const { result } = renderHook(() => useForm());

    act(() => result.current.validate);

    expect(result.current.validate).not.toBeNull();
  });
});
