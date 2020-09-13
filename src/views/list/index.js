import React from 'react'

import GitHubList from '../../components/list/github-list'
import CodeList from '../../components/list/code-list'

function PageList(props) {
  const matchMap = new Map([
    ['code', CodeList],
    ['github', GitHubList],
  ])
  
  return <div>{matchMap.get(props.type)()}</div>
}

export default PageList
