export const pushMock = jest.fn();

export function useRouter() {
  return {
    push: pushMock,
  };
}

export function usePathname() {
  return "/";
}

export function useSearchParams() {
  return new URLSearchParams();
}
