import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { Button } from 'antd'

export const LogOut = connect(null, { logout })(({ logout }) => {
  return <Button onClick={logout}>LogOut</Button>
})
