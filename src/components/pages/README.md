
### 5. **Pages (페이지)**

```md
# Pages

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
