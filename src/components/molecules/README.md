### 2. **Molecules (분자)**

````md
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
````
