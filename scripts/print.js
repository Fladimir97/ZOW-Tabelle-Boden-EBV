function changeprintSheet() {
  let stylesheet = document.getElementById("DruckOpt").value;
  let stylesheetTag = document.getElementById("print-stylesheet");
  stylesheetTag.setAttribute("href", `./style/${stylesheet}`);
  ausw();
}
