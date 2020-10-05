import React from "react"
function InlineEdit(props) {
  return (
    <span className="inline-text_copy inline-text_copy--active">
      {props.text}
      <input className="inline-text_input inline-text_input--rest" />
    </span>
  )
}
export default InlineEdit