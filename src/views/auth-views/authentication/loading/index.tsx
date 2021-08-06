import React from 'react'
import { Card, Row, Col } from "antd";
import { useStoreState } from 'state'
import Loading from 'components/shared-components/Loading'

const LoginOne = () => {
	const theme = useStoreState(state => state.theme.currentTheme)

	const backgroundStyle = {
		background: theme === 'dark'
			? 'linear-gradient(to right, #cb2d3e, #ef473a)'
			: 'linear-gradient(to right, #cb2d3e, #ef473a)',
		minHeight: '100vh',
		display: 'flex',
		alignItems: 'center'
	}

	return (
		<div className="h-100" style={backgroundStyle}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={20} sm={20} md={20} lg={7}>
						<Card>
							<div className="my-4">
								<div className="text-center">
									<img className="img-fluid" src={`/img/${theme === 'light' ? 'logo.svg': 'logo-white.svg'}`} alt="" />
								</div>
								<Row justify="center">
									<Col xs={24} sm={24} md={20} lg={20}>
                    <Loading />
									</Col>
								</Row>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default LoginOne
