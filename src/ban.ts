document.onkeydown = (event: KeyboardEvent) => {
  // 禁用 F12
  if (event.keyCode === 123) {
    return false
    // 禁用 ctrl+shift+i
  } else if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
    return false
    // 屏蔽 Shift+F10
  } else if (event.shiftKey && event.keyCode === 121) {
    return false
  }
}

// 禁用右键菜单
document.oncontextmenu = (event: MouseEvent) => {
  event.preventDefault() // 阻止默认的右键菜单
  return false // 也可以返回 false
}
