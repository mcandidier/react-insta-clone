import React from 'react'
import { connect } from 'react-redux'

export const Likes = (props) => {
  return (
    <div>Likes</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Likes)