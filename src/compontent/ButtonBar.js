import React from 'react'
import PropType from 'prop-types'
import styled from 'styled-components'

const BarContainer = styled.div`

`
const BarButton = styled.button`
  &:first-child{}
  &:last-child{

  }

`

function ButtonBar(props) {
  const {list, onChange, rangeKey, ...rest} = props
  return (
    <BarContainer {...rest}>
      {
        list && list.map((item, index) => {
          return <BarButton onClick={()=> onChange(index)} key={ index }>{ rangeKey ? item[rangeKey] : item }</BarButton>
        })
      }
    </BarContainer>
  )
}

ButtonBar.PropType = {
  list: PropType.array.isRequired,
  onChange: PropType.func,
  rangeKey: PropType.string
}

export default ButtonBar