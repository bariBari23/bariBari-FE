import { styled } from 'styled-components';
import { ReactComponent as LogoBig } from '../assets/logoBig.svg';
import { ReactComponent as VerticalLine } from '../assets/verticalLine.svg';
import { ReactComponent as HorizontalLine } from '../assets/horizontalLine.svg';
import { SubmitHandler, useForm } from 'react-hook-form';

import Header from '../component/Header';

interface LoginData {
    email: string;
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
                <LogoBig />
                <SubTitle>자취생을 위한 건강한 식사 방법</SubTitle>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputWrapper>
                        <Input
                            type="text"
                            placeholder="이메일을 입력해주세요."
                            aria-invalid={!!errors.email}
                            {...register('email', {
                                required: true,
                                pattern: /@/,
                            })}
                        />
                        {errors.email && errors.email?.type === 'required' && (
                            <ErrorMessage>이메일을 입력해주세요!</ErrorMessage>
                        )}
                        {errors.email && errors.email?.type === 'pattern' && (
                            <ErrorMessage>@를 포함해 유효한 이메일 주소를 적어주세요.</ErrorMessage>
                        )}
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력해주세요"
                            {...register('password', {
                                required: '비밀번호를 입력해주세요!',
                                minLength: {
                                    value: 8,
                                    message: '비밀번호는 최소 8글자의 영어 대소문자와 숫자를 포함해야 합니다.',
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: '비밀번호는 최소 8글자의 영어 대소문자와 숫자를 포함해야 합니다.',
                                },
                            })}
                        />
                        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
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
                {/* sns 로그인은 mvp 단계에서 구현 보류 */}
                {/* <GoogleLoginWrapper>
                    <GoogleLoginText>
                        <HorizontalLine />
                        <p>SNS 계정으로 로그인</p>
                        <HorizontalLine />
                    </GoogleLoginText>

                    <GoogleLoginButton />
                </GoogleLoginWrapper> */}
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
    color: #504e5f;
    font-size: 16px;
    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-weight: 600;
    line-height: 28px;
    outline: none;
    &::placeholder {
        color: #aaa;
    }
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
