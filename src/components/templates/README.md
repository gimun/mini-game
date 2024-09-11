
### 4. **Templates (템플릿)**

```md
# Templates

이 폴더에는 페이지의 전체적인 구조를 정의하는 템플릿이 포함됩니다. 템플릿은 Organisms 및 기타 컴포넌트의 배치를 결정하며, 실제 데이터는 포함되지 않습니다.

## 예시
- **MainPageTemplate**: 헤더, 콘텐츠 영역, 풋터가 포함된 메인 페이지 템플릿.
- **DashboardTemplate**: 사이드바와 메인 콘텐츠 영역이 포함된 대시보드 레이아웃.
- **AuthTemplate**: 로그인 또는 회원가입 페이지에 사용되는 간단한 템플릿.

## 가이드라인
- 템플릿은 페이지의 레이아웃을 정의하며, 데이터를 직접 포함하지 않습니다.
- Organisms와 Molecules를 적절하게 배치하여 구조를 설정합니다.
- 다양한 페이지에서 재사용할 수 있도록 유연하게 설계합니다.

## 사용 예시
```jsx
<MainPageTemplate header={<Header />} content={<ProductList />} footer={<Footer />} />
<DashboardTemplate sidebar={<Sidebar />} content={<Dashboard />} />
<AuthTemplate form={<LoginForm />} />
