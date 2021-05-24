import React from 'react';
import styled from 'styled-components'

export default function Progress(props) {
	const { total, progress, hasPercentage } = props
	let percentage = progress / total * 100

	const ProgressMain = styled.div`
		position: relative;
		padding-top: ${hasPercentage ? 15 : 8}px
	`

	const ProgressBJ = styled.div`
		width: 100%;
		height: 10px;
		background: #dedede;
		position: relative;
		overflow: hidden;
		border-radius: 10px
	`

	const ProgressBox = styled.div`
		height: 10px;
		background: #1AAAA8;
		position: absolute;
		width: ${percentage}%;
		border-radius: 10px
	`

	const PercentageBox = styled.div`
		position: absolute;
		right: 0;
		top: 0;
		font-size: 12px
	`

	return (
		<ProgressMain>
			<ProgressBJ>
				<ProgressBox />
			</ProgressBJ>
			{hasPercentage && <PercentageBox>{progress}/{total}</PercentageBox>}
		</ProgressMain>
	)
}