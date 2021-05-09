import React from 'react'
import insLogo from '../../asset/svg/insurance.svg'
import styled from 'styled-components'

export default function InsPolicyPop({ onConfirm, onCancel }) {
  return (
    <div className="ins-policy-pop">
      <Content>
        <Logo style={{ backgroundImage: `url(${insLogo})` }}></Logo>
        <Title>Insurance policy</Title>
        <Desc>
          CZZswap takes approximate 1 minute to complete, you may be subject to
          exchange rate volatility during this time. An insurance policy is
          available to mitigate this risk.
        </Desc>
        <p>&nbsp;</p>
        <Desc>
          The premium rate 0.1%, and the proceeds of sale will be distributed to
          reserve providers of the insurance contract.
        </Desc>
        <BtnWrap>
          <ConfirmBtn onClick={onConfirm}>Confirm</ConfirmBtn>
          <CancelBtn onClick={onCancel}>No</CancelBtn>
        </BtnWrap>
      </Content>
    </div>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Logo = styled.div`
  width: 206px;
  height: 152px;
  margin: 36px 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`
const Title = styled.div`
  height: 58px;
  line-height: 58px;
  font-size: 24px;
  color: #000000;
`
const Desc = styled.div`
  font-size: 12px;
  width: 316px;
`
const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 46px 0 30px 0;
`
const Btn = styled.div`
  width: 109px;
  height: 38px;
  line-height: 38px;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
`
const ConfirmBtn = styled(Btn)`
  background: #0000ff;
  color: #ffffff;
  margin-right: 12px;
  width: 72px;
`
const CancelBtn = styled(Btn)`
  background: #ffffff;
  border: 1px solid #0000ff;
  color: #0000ff;
`
