import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch } from "../../hooks/useFetch";

describe("useFetch", () => {
  it("should be to return value data", () => {
    const { result } = renderHook(() => useFetch());

    act(() => result.current.data);

    expect(result.current.data).toBeNull();
  });

  it("should be to return value error", () => {
    const { result } = renderHook(() => useFetch());

    act(() => result.current.error);

    expect(result.current.data).toBeNull();
  });

  it("should be to return value request", () => {
    const { result } = renderHook(() => useFetch());

    act(() => result.current.request);

    expect(result.current.request.length).toBe(2);
  });
});
