# 1. Atoms

이 폴더에는 프로젝트에서 가장 작은 단위의 UI 컴포넌트가 포함됩니다. 이 컴포넌트들은 더 이상 쪼갤 수 없는 기본적인 요소들로, 복잡한 컴포넌트의 기본이 됩니다.

## 예시

- **Button**: 간단한 버튼 컴포넌트.
- **Input**: 기본 입력 필드.
- **Label**: 폼 또는 UI 요소에 사용되는 텍스트 라벨.

## 가이드라인

- 이 폴더의 컴포넌트는 다른 컴포넌트에 의존하지 않고 독립적으로 동작해야 합니다.
- 로직은 최소화하고, 주로 표시(presentation)에 집중해야 합니다.
- 컴포넌트는 `props`를 통해 재사용 가능하고 커스터마이징 가능해야 합니다.

## 사용 예시

```jsx
<Button label="제출" onClick={handleSubmit} />
<Input placeholder="이름을 입력하세요" value={name} onChange={handleInputChange} />
<Label text="사용자 이름" />
```

# 2. **Molecules (분자)**

# Molecules

이 폴더에는 여러 원자가 결합하여 만들어진 UI 컴포넌트가 포함됩니다. Molecules는 특정 기능이나 상호작용을 캡슐화한 작은 블록입니다.

## 예시

- **FormField**: 라벨과 입력 필드가 결합된 폼 요소.
- **SearchBar**: 입력 필드와 버튼이 결합된 검색 바.
- **Card**: 이미지, 제목, 설명을 포함한 카드 컴포넌트.

## 가이드라인

- Molecules는 여러 원자들로 구성되며, 간단한 로직을 가질 수 있습니다.
- 다양한 상황에서 재사용할 수 있도록 `props`를 통해 유연성을 유지해야 합니다.
- 컴포넌트가 수행하는 기능이 명확하게 드러나도록 설계합니다.

## 사용 예시

```jsx
<FormField label="이메일" inputType="email" />
<SearchBar placeholder="검색어 입력..." onSearch={handleSearch} />
<Card title="게임 통계" description="상세 통계를 확인하세요" image={gameImage} />
```

# 3. **Organisms (유기체)**

이 폴더에는 여러 Molecules와 Atoms를 결합해 만들어진 보다 복잡한 UI 컴포넌트가 포함됩니다. Organisms는 UI에서 의미 있는 영역을 구성합니다.

## 예시

- **Header**: 로고, 네비게이션 링크, 검색 바로 구성된 헤더.
- **ProductList**: 제품 카드 리스트와 필터링 기능을 포함한 제품 목록.
- **UserProfile**: 사용자 아바타, 이름, 통계 정보를 표시하는 프로필.

## 가이드라인

- Organisms는 주로 레이아웃과 구조를 정의하며, Molecules와 Atoms를 결합합니다.
- 페이지의 특정 영역(예: 헤더, 풋터, 사이드바 등)을 구성하는 데 사용됩니다.
- 다양한 템플릿 또는 페이지에서 재사용할 수 있도록 설계합니다.

## 사용 예시

```jsx
<Header logo={logoImage} links={navLinks} />
<ProductList products={productData} />
<UserProfile user={currentUser} />
```

# 4. **Templates (템플릿)**

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
```

# 5. **Pages (페이지)**

이 폴더에는 실제 페이지가 포함됩니다. 페이지는 템플릿에 데이터를 주입하고, 특정 비즈니스 로직을 처리하여 최종 사용자에게 보여지는 화면을 만듭니다.

## 예시

- **HomePage**: 웹사이트의 메인 랜딩 페이지.
- **UserDashboard**: 사용자의 정보와 활동을 보여주는 대시보드.
- **ProductDetailsPage**: 특정 제품에 대한 상세 정보를 표시하는 페이지.

## 가이드라인

- 페이지는 데이터를 가져오고 상태를 관리하며, 적절한 `props`를 템플릿과 Organisms에 전달합니다.
- 비즈니스 로직과 데이터 표시를 책임지며, 레이아웃은 템플릿과 Organisms에서 처리합니다.
- 페이지에 너무 많은 레이아웃 코드를 넣지 말고, 템플릿과 Organisms에 위임합니다.

## 사용 예시

```jsx
const HomePage = () => {
  const products = fetchProducts();

  return (
    <MainPageTemplate
      header={<Header />}
      content={<ProductList products={products} />}
      footer={<Footer />}
    />
  );
};
```
