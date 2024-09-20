# Atoms

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
