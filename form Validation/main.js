function addTemp(e) {
  const tempName = e.target.parentElement.dataset.template;
  let temp = document
    .querySelector(`template#${tempName}`)
    .content.cloneNode(true);
  temp = temp.querySelector(`div`);
  console.log(temp);
  temp.dataset.remove = e.target.parentElement.children.length - 1;
  temp.querySelector("span.remove").addEventListener("click", removeTemp);
  e.target.parentElement.appendChild(temp);
}
function removeTemp(e) {
  const parent = e.target.parentElement.parentElement;
  const removedNumber = e.target.parentElement.dataset.remove;
  const removed = parent.querySelector(`div[data-remove="${removedNumber}"]`);
  parent.removeChild(removed);
}

document.querySelectorAll("span.add").forEach((element) => {
  element.addEventListener("click", addTemp);
});
