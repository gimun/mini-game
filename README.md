# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Atomic 디자인 패턴
- Atom: 더 이상 분해할 수 없는 기본 컴포넌트
- Molecule: 한 가지의 일을 하는 고유한 특성을 가진 컴포넌트
- Organism: 서비스에서 표현될 수 있는 명확한 영역, 재사용성이 낮아진다.
- Template: 실제 컴포넌트를 레이아웃에 배치하고 구조를 잡는 와이어 프레임
- Page: 유저가 볼 수 있는 최종 UI