
### 3. **Organisms (유기체)**

```md
# Organisms

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
