import { styled } from 'styled-components';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as VerticalLine } from '../assets/verticalLine.svg';
import { ReactComponent as HorizontalLine } from '../assets/horizontalLine.svg';
import { SubmitHandler, useForm } from 'react-hook-form';

import Header from '../component/Header';

interface LoginData {
    username: string;
    password: string;
}

export default function LogIn() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();
    const onSubmit: SubmitHandler<LoginData> = (data) => {
        console.log(data);
    };
    return (
        <div>
            <Header showPageName={false} pageTitle="" showSearchBar={false} />
            <Wrapper>
                <Logo />
                <SubTitle>자취생을 위한 건강한 식사 방법</SubTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper>
                        <Input
                            id="username"
                            type="text"
                            placeholder="아이디를 입력해주세요"
                            {...register('username', { required: true })}
                        />
                        {errors.username && <ErrorMessage>아이디 입력</ErrorMessage>}
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <ErrorMessage>비밀번호 입력</ErrorMessage>}
                    </InputWrapper>
                    <SubmitButton type="submit">로그인</SubmitButton>
                </Form>
                <OptionWrapper>
                    <p>회원가입</p>
                    <VerticalLine />
                    <p>아이디 찾기</p>
                    <VerticalLine />
                    <p>비밀번호 찾기</p>
                </OptionWrapper>
                <GoogleLoginWrapper>
                    <GoogleLoginText>
                        <HorizontalLine />
                        <p>SNS 계정으로 로그인</p>
                        <HorizontalLine />
                    </GoogleLoginText>

                    <GoogleLoginButton />
                </GoogleLoginWrapper>
            </Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    width: 24.375rem;
    height: 56.3125rem;
    padding: 0px 16px;
    margin-top: 93px;
`;
const SubTitle = styled.p`
    color: #504e5f;
    font-size: 20px;

    font-style: normal;
    font-weight: 600;
    line-height: 128.065%;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    height: 28px;
    padding: 8px 16px;
    border-radius: 8px;
    border: 0.75px solid #aaa;
    background: #fff;
    color: #aaa;
    font-size: 16px;

    font-style: normal;
    font-weight: 600;
    line-height: 28px;
`;

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 366px;
    padding: 18px 40px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 12px;
    background: #ff7455;
    color: #fff;
    font-size: 18px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    line-height: 28px;
    border: none;
    margin-top: 24px;
`;

const OptionWrapper = styled.div`
    gap: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--grey-subtext, #504e5f);
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 128.065%;
    margin-top: 18px;
`;

const GoogleLoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
`;
const GoogleLoginText = styled.div`
    margin-top: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 21px;
    color: var(--grey-3, #aaa);
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 128.065%;
`;

const GoogleLoginButton = styled.button`
    display: flex;
    padding: 8px 13px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 12px;
    background: var(--grey-1, #f9f9f9);
    height: 40px;
`;
