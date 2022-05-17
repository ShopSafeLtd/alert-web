import React, { useEffect } from 'react'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
import { useStoreActions, useStoreState } from 'state'

const rules = {
	email: [
		{ 
			required: true,
			message: 'Please input your email address'
		},
		{ 
			type: 'email',
			message: 'Please enter a validate email!'
		}
	],
	password: [
		{ 
			required: true,
			message: 'Please input your password'
		}
	],
	confirm: [
		{ 
			required: true,
			message: 'Please confirm your password!'
		},
		({ getFieldValue }: { getFieldValue:any }) => ({
			validator(_:any, value:string) {
				if (!value || getFieldValue('password') === value) {
					return Promise.resolve();
				}
				return Promise.reject('Passwords do not match!');
			},
		})
	]
}

export interface Props {
	allowRedirect: boolean;
}

export const RegisterForm = (props: Props) => {
	const { allowRedirect } = props

	const loading = useStoreState((state) => state.auth.loading);
  const message = useStoreState((state) => state.auth.message);
  const showMessage = useStoreState((state) => state.auth.showMessage);
  const token = useStoreState((state) => state.auth.token);
	const redirect = useStoreState((state) => state.auth.redirect);

	const showLoading = useStoreActions((actions) => actions.auth.showLoading);
  const hideAuthMessage = useStoreActions(
    (actions) => actions.auth.hideAuthMessage
  );

	const [form] = Form.useForm();
	let navigate = useNavigate();

	const onSignUp = () => {
    	form.validateFields().then(values => {
			showLoading()
		}).catch(info => {
			console.log('Validate Failed:', info);
		});
	}

	useEffect(() => {
    	if (token !== null && allowRedirect) {
				navigate(redirect)
		}
		if(showMessage) {
				setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
  });
	
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form form={form} layout="vertical" name="register-form" onFinish={onSignUp}>
				<Form.Item 
					name="email" 
					label="Email"
					// @ts-expect-error 
					rules={rules.email}
					hasFeedback
				>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label="Password" 
					rules={rules.password}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="confirm" 
					label="ConfirmPassword" 
					rules={rules.confirm}
					hasFeedback
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign Up
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default RegisterForm
