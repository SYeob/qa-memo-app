import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import MemoApp from "./MemoApp";

describe("MemoApp with animations", () => {
  test("메모 추가 시 화면에 나타남 (fade-in)", async () => {
    render(<MemoApp />);

    const input = screen.getByPlaceholderText("메모 입력");
    const addButton = screen.getByText("추가");

    // 메모 추가
    fireEvent.change(input, { target: { value: "애니메이션 메모" } });
    fireEvent.click(addButton);

    // 화면에 나타났는지 확인
    expect(await screen.findByText("애니메이션 메모")).toBeInTheDocument();
  });

  test("메모 삭제 시 애니메이션 후 DOM에서 사라짐 (fade-out)", async () => {
    render(<MemoApp />);

    const input = screen.getByPlaceholderText("메모 입력");
    const addButton = screen.getByText("추가");

    // 메모 추가
    fireEvent.change(input, { target: { value: "삭제될 메모" } });
    fireEvent.click(addButton);

    const memo = await screen.findByText("삭제될 메모");
    expect(memo).toBeInTheDocument();

    // 삭제 버튼 클릭
    const deleteButton = screen.getByText("삭제");
    fireEvent.click(deleteButton);

    // DOM에서 완전히 제거될 때까지 대기 (exit 애니메이션 반영)
    await waitForElementToBeRemoved(() => screen.queryByText("삭제될 메모"));
  });

  test("다크 모드 토글이 동작한다", () => {
    render(<MemoApp />);

    const toggleButton = screen.getByText("🌙 다크 모드");
    fireEvent.click(toggleButton);

    // 다크 모드 버튼 텍스트 확인
    expect(screen.getByText("☀️ 라이트 모드")).toBeInTheDocument();
  });
});
