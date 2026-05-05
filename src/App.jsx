import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Briefcase, TrendingUp, ShieldCheck, ChevronDown, ChevronUp,
  Award, BarChart3, AlertTriangle, Building2, Calendar,
  Filter, Globe, Mail, CheckCircle, Phone,
  ArrowRight, FileText, Layers, MapPin, Search, Target
} from "lucide-react";
import logo from './assets/Лого-Photoroom.png';

const NAV  = "#10316A";
const BLU  = "#2061D5";
const BABY = "#A6C2F2";
const PORC = "#FDFAF5";

const MONTH_DATA = [
  { label: "Янв", v: 2 },
  { label: "Фев", v: 3 },
  { label: "Мар", v: 8 },
  { label: "Апр", v: 9 },
];

const PORTFOLIO_DATA = [
  { name: "Тендеры",   count: 9 },
  { name: "Риски",     count: 9 },
  { name: "Аналитика", count: 6 },
];

const CASES = [
  { id:1, month:"Январь", category:"Тендеры", client:"Нефтесервисная компания «А»", business:"Исследования скважин, опыт в РФ и за рубежом", request:"Обеспечить комплексное тендерное сопровождение для победы в закупке по исследованиям скважин у ВИНК в ХМАО. Сохранить цену контракта в процессе закупки.", solution:"4 месяца поддержки: расчёт точки входа, консультации по подготовке документов для ТКЧ, подготовка к переторжкам без значительного снижения цены.", result:"Победа в закупке. В январе подписан годовой контракт с заказчиком на сумму свыше 50 млн ₽.", money:50 },
  { id:2, month:"Январь", category:"Тендеры", client:"Нефтесервисная компания «О»", business:"Ремонт и обслуживание систем буровых станков", request:"Обеспечить комплексное тендерное сопровождение и победу в закупке по ремонтам буровых установок у буровой компании в Западной Сибири.", solution:"5 месяцев сопровождения, 4 переторжки. Расчёт точки входа, консультации по документам для ТКЧ.", result:"Победа в закупке. В январе подписан годовой контракт с заказчиком на сумму свыше 60 млн ₽.", money:60 },
  { id:3, month:"Февраль", category:"Риски", client:"Предприятие ГК «Ростех»", business:"Масштабные стратегические проекты в промышленном секторе", request:"Провести глубокую проверку пула потенциальных подрядчиков: выявить скрытые финансовые, кадровые и операционные аномалии.", solution:"Комплексный мониторинг бенефициаров и топ-менеджмента. Выявлены компании без ресурсов с риском прекращения деятельности сразу после получения авансов.", result:"Клиент избежал потери крупных авансов и срыва сроков. Сформирован пул проверенных партнёров, сохранена репутация перед госкорпорацией." },
  { id:4, month:"Февраль", category:"Тендеры", client:"ООО «Эверест»", business:"Строительство и ремонт трубопроводов до 100 км", request:"Выйти на рынок ЯНАО и ХМАО, подтвердить квалификацию перед новыми заказчиками и пройти строгие технические аудиты.", solution:"Аудит процессов, подготовка пакета документов. Включение в реестр благонадёжных поставщиков для получения персональных приглашений.", result:"Клиент вошёл в список приоритетных партнёров и получил доступ к прибыльным северным закупкам — база для кратного роста выручки." },
  { id:5, month:"Февраль", category:"Риски", client:"Нефтесервисная компания «И»", business:"Капитальный и текущий ремонт скважин (оборот > 2 млрд ₽)", request:"Заказчик выставил штрафы свыше 2 млн ₽ за нарушения. Риск регулярного начисления санкций и системных финансовых потерь.", solution:"Аудит ситуации установил обоюдную вину сторон. Разработан план предотвращения сбоев, направлены аргументы для снижения штрафов.", result:"Заказчик снизил штраф вдвое — до 1 млн ₽. Устранены операционные разногласия. В следующем месяце — ни одной новой претензии.", saved:1 },
  { id:6, month:"Март", category:"Аналитика", client:"ООО «Гидролайн»", business:"Производитель гидравлических рукавов (выручка до 100 млн ₽)", request:"Снижение заказов из-за узкого круга прямых контрактов. Отсутствует опыт тендеров — риски потери рынка и ликвидности.", solution:"Глубокий тендерный и рыночный анализ регионального и отраслевого спроса. Установлены конкуренты и партнёры, сформирован портрет заказчиков в нефтегазе.", result:"Клиент получил информацию о структуре рынка, которой ранее не обладал, и конкретные рекомендации по участию в тендерах." },
  { id:7, month:"Март", category:"Риски", client:"Нефтесервисный холдинг (иностранный капитал)", business:"Высокотехнологичный сервис предприятий энергетического сектора", request:"Собственники планировали передать управление активами в РФ зарубежной управляющей компании. Требовалась оценка последствий.", solution:"Комплексный аудит: финансовые, фискальные и юридические угрозы. Выявлен риск полной блокировки доступа к российским нефтегазовым тендерам.", result:"Совет директоров отказался от реструктуризации. Сохранён статус надёжного поставщика и право на участие в закупках." },
  { id:8, month:"Март", category:"Риски", client:"Транспортная компания «Э»", business:"Спецтехника для нефтегазового сектора (выручка > 800 млн ₽)", request:"Заказчик предъявил претензии по нарушению ТБ. Штрафы до 1 млн ₽ и риск блокировки пропусков с масштабным простоем техники.", solution:"Независимый аудит инцидента. Сбор доказательств отсутствия вины. Юридически обоснованный пакет документов для заказчика.", result:"Заказчик полностью принял аргументы и отозвал претензии. Сохранён 1 млн ₽, предотвращена остановка работ.", saved:1 },
  { id:9, month:"Март", category:"Аналитика", client:"ООО «ЮжуралОйл»", business:"Производство и ремонт подъёмных вышек для нефтегаза", request:"Снижение заказов при работе с узким кругом клиентов по прямым контрактам. Слабый опыт в тендерах — риски потери рынка.", solution:"Глубокий тендерный и рыночный анализ регионального и отраслевого спроса. Определены ключевые конкуренты и портрет заказчиков в нефтегазе.", result:"Клиент получил информацию о структуре рынка и конкретные рекомендации по выходу на тендерный рынок." },
  { id:10, month:"Март", category:"Риски", client:"Конфиденциально (B2B)", business:"Услуги по цифровизации бизнеса", request:"Камеральная проверка ИФНС: выплаты самозанятым поставлены под сомнение — риск доначисления налогов на 2 млн ₽.", solution:"Оценка ситуации подтвердила необоснованность претензий ИФНС. Подготовлен комплект защитных документов и официальные возражения.", result:"ИФНС приняла все доводы и завершила проверку. Клиент избежал доначисления налогов на 2 млн ₽.", saved:2 },
  { id:11, month:"Март", category:"Риски", client:"Транспортная компания «Э»", business:"Спецтехника для нефтегазового сектора (выручка > 800 млн ₽)", request:"Аудиторская комиссия заказчика выявила множество нарушений. Риск исключения из тендеров и расторжения контрактов.", solution:"Изучение результатов аудита, план оперативного устранения нарушений. Переговоры с заказчиком — предложен проект устранения недостатков.", result:"Заказчик сменил позицию на лояльную. Клиент сохранён в списке приоритетных подрядчиков и получил доступ к крупным тендерам." },
  { id:12, month:"Март", category:"Тендеры", client:"ООО НПФ «Октябрьский Пакер»", business:"Производство пакеров и оборудования для нефтегаза", request:"Оценить целесообразность участия в тендере ВИНК, определить объём контракта и спрогнозировать конкурентную активность.", solution:"Анализ конъюнктуры рынка, расчёт точки входа. Получены данные о целях закупки и производственных процессах. Прогноз конкуренции.", result:"Клиент получил ценные данные для участия в закупке и повысил шансы на победу. Тендер реализует силами штатных специалистов." },
  { id:13, month:"Март", category:"Аналитика", client:"Транспортная компания «Э»", business:"Спецтехника для нефтегазового сектора (выручка > 800 млн ₽)", request:"Прогноз спроса в структурах НОВАТЭКа и Газпром нефти (Западная Сибирь) для расширения рынков и заключения новых контрактов.", solution:"Анализ закупок за 2 года: виды потребности, логистика, скрытые риски, расположение месторождений. Прогноз конкурентной активности.", result:"Клиент получил время на подготовку техники, персонала и разрешительных документов до выхода закупок — стратегическое преимущество." },
  { id:14, month:"Апрель", category:"Тендеры", client:"Нефтесервисная компания «О»", business:"Ремонт и обслуживание систем буровых станков", request:"Обеспечить комплексное тендерное сопровождение и победу в закупке по ремонтам буровых установок в Западной Сибири.", solution:"3 месяца сопровождения: расчёт точки входа, документы для ТКЧ, прохождение 2 переторжек без значительного снижения цены.", result:"Победа в закупке. В апреле подписан годовой контракт с заказчиком на сумму свыше 120 млн ₽.", money:120 },
  { id:15, month:"Апрель", category:"Тендеры", client:"Нефтесервисная компания «А»", business:"Исследования скважин, опыт в РФ и за рубежом", request:"Победа в закупке у ВИНК в Западной Сибири с высокой конкуренцией. Сохранить цену контракта при борьбе за рынок.", solution:"3 месяца поддержки: расчёт точки входа, документы для ТКЧ, подготовка к 2 переторжкам без жёсткого снижения.", result:"Победа в закупке. Во II квартале планируется подписание контракта на сумму свыше 90 млн ₽.", money:90 },
  { id:16, month:"Апрель", category:"Риски", client:"Нефтесервисная компания «А»", business:"Исследования скважин, опыт в РФ и за рубежом", request:"Глубокая проверка потенциального партнёра для совместного проекта: выявить финансовые, кадровые и операционные аномалии.", solution:"Комплексный мониторинг бизнеса партнёра. Выявлены: корпоративные споры с ВИНК с признаками мошенничества, санкционные риски.", result:"Клиент своевременно получил стратегически важную информацию. Токсичное партнёрство отвергнуто — сохранены бюджет и репутация перед ВИНК." },
  { id:17, month:"Апрель", category:"Аналитика", client:"ООО «Вектор»", business:"Сметное сопровождение и ПИР", request:"Снижение прямых контрактов, необходимость выхода на рынки ЯНАО и ХМАО. Отсутствие опыта участия в тендерах.", solution:"Глубокий тендерный и рыночный анализ регионального спроса в ЯНАО и ХМАО. Сформирован портрет заказчиков в нефтегазовой отрасли.", result:"Разработан план выхода на новые рынки сбыта. Клиент получил инсайды и рекомендации по участию в тендерах." },
  { id:18, month:"Апрель", category:"Риски", client:"Предприятие ГК «Ростех»", business:"Масштабные стратегические проекты в промышленном секторе", request:"Проверка на должную осмотрительность двух потенциальных подрядчиков: выявить скрытые финансовые и операционные аномалии.", solution:"Комплексный мониторинг. Конечные бенефициары имели скрытый бизнес и имущество в Европе. Выявлены санкционные риски и риск офшорного вывода средств.", result:"Клиент избежал потери крупных авансовых платежей. Сохранены бюджет и репутация заказчика." },
  { id:19, month:"Апрель", category:"Аналитика", client:"АО «Тяжпроммаш»", business:"Крупный производитель задвижек и запорной арматуры", request:"Оценить спрос на продукцию в нефтегазодобывающем секторе Западной Сибири для подготовки к будущим тендерам.", solution:"Тендерный анализ активности ключевых ВИНК за 3 года. Выявлены позиции с высоким спросом, спрогнозированы закупки текущего года.", result:"Клиент получил подробные данные о номенклатуре спроса и предполагаемых бюджетах закупок ключевых ВИНК до конца года." },
  { id:20, month:"Апрель", category:"Тендеры", client:"Транспортная компания «Э»", business:"Спецтехника для нефтегазового сектора (выручка > 800 млн ₽)", request:"Победа в закупке услуг экскаваторов у ВИНК в Западной Сибири при высокой конкуренции и риске потери маржинальности.", solution:"3 месяца поддержки: расчёт точки входа, документы для ТКЧ, сопровождение 2 переторжек без значительного снижения цены.", result:"Победа в закупке. В течение месяца планируется подписание контракта на транспортные услуги на сумму свыше 130 млн ₽.", money:130 },
  { id:21, month:"Апрель", category:"Аналитика", client:"Транспортная компания «Э»", business:"Спецтехника для нефтегазового сектора (выручка > 800 млн ₽)", request:"Изучить и оценить спрос транспортных услуг в добывающих обществах НОВАТЭКа в ЯНАО для подготовки к будущим тендерам.", solution:"Тендерный анализ добывающих обществ НОВАТЭКа за 3 года: виды транспорта, условия, ключевые данные. Прогноз закупок текущего года.", result:"Клиент получил эксклюзивные данные о бюджетах закупок ВИНК и стратегическое преимущество при подготовке к будущим тендерам." },
  { id:22, month:"Апрель", category:"Тендеры", client:"ООО «Технологии ОФС»", business:"Нефтесервисные услуги по ННБ", request:"Оценить целесообразность участия в тендере по ННБ для ВИНК в Западной Сибири, определить объём контракта и спрогнозировать конкуренцию.", solution:"Детальный анализ тендера, расчёт точки входа, данные о специфике выполнения контракта при победе. Прогноз конкурентной активности.", result:"Клиент получил ценные данные и повысил шансы на победу. Тендерный процесс реализует силами штатных специалистов." },
];

const CATS   = ["Все","Тендеры","Риски","Аналитика"];
const MONTHS = ["Все","Январь","Февраль","Март","Апрель"];

/* ─── COUNTER ─── */
function Counter({ to, prefix="", suffix="" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || done.current) return;
      done.current = true;
      const steps = 90; let cur = 0;
      const inc = to / steps;
      const t = setInterval(() => {
        cur += inc;
        if (cur >= to) { setVal(to); clearInterval(t); }
        else setVal(Math.floor(cur));
      }, 18);
    }, { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, [to]);
  return React.createElement("span", { ref }, prefix + val.toLocaleString("ru-RU") + suffix);
}

/* ─── MONTH BARS ─── */
function MonthBars() {
  const mx = 9;
  return React.createElement("div", { style: { marginTop: 22 } },
    React.createElement("div", {
      style: { display: "flex", alignItems: "flex-end", gap: 10, height: 140 }
    }, MONTH_DATA.map((d, i) =>
      React.createElement("div", { key: i, style: { flex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center" } },
        React.createElement("div", { style: { flex: 1, width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center" } },
          React.createElement("div", {
            style: {
              width: "100%", maxWidth: 54, minHeight: 26, borderRadius: "6px 6px 0 0",
              height: ((d.v / mx) * 100) + "%",
              background: i < 2 ? BABY : BLU,
              display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 6,
            }
          }, React.createElement("span", { style: { fontSize: 13, fontWeight: 700, color: i < 2 ? NAV : "#fff" } }, d.v))
        ),
        React.createElement("div", { style: { height: 1, width: "100%", background: "#E0E8F4" } }),
        React.createElement("span", { style: { fontSize: 12, color: "#6B7FA3", marginTop: 7, fontWeight: 500 } }, d.label)
      )
    )),
    React.createElement("div", {
      style: { marginTop: 14, display: "inline-flex", alignItems: "center", gap: 7, background: "#EEF3FC", borderRadius: 7, padding: "7px 13px" }
    },
      React.createElement(TrendingUp, { size: 13, color: BLU }),
      React.createElement("span", { style: { fontSize: 12, color: BLU, fontWeight: 600 } }, "Рост ×4,5 за квартал")
    )
  );
}

/* ─── PORTFOLIO BARS ─── */
function PortfolioBars() {
  const colors = [BLU, NAV, BABY];
  return React.createElement("div", { style: { marginTop: 22, display: "flex", flexDirection: "column", gap: 16 } },
    ...PORTFOLIO_DATA.map((d, i) =>
      React.createElement("div", { key: i },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } },
          React.createElement("span", { style: { fontSize: 14, fontWeight: 500, color: NAV } }, d.name),
          React.createElement("span", { style: { fontSize: 13, color: "#6B7FA3" } }, d.count + " кейсов")
        ),
        React.createElement("div", { style: { height: 10, background: "#E8EEF8", borderRadius: 100, overflow: "hidden" } },
          React.createElement("div", { style: { height: "100%", borderRadius: 100, width: ((d.count / 22) * 100) + "%", background: colors[i] } })
        )
      )
    ),
    React.createElement("div", { style: { display: "flex", gap: 14, flexWrap: "wrap" } },
      ...PORTFOLIO_DATA.map((d, i) =>
        React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 6 } },
          React.createElement("div", { style: { width: 10, height: 10, borderRadius: 2, background: colors[i] } }),
          React.createElement("span", { style: { fontSize: 12, color: "#6B7FA3" } }, d.name)
        )
      )
    )
  );
}

/* ─── CASE CARD ─── */
function CaseCard({ item, open, onToggle }) {
  const CAT_ICONS = { "Тендеры": Briefcase, "Риски": ShieldCheck, "Аналитика": BarChart3 };
  const CatIcon = CAT_ICONS[item.category] || FileText;
  const catStyle = {
    "Тендеры":   { bg: "#EEF3FC", fg: BLU,  br: BABY },
    "Риски":     { bg: "#EBF0F8", fg: NAV,  br: BABY },
    "Аналитика": { bg: "#F0F4FF", fg: NAV,  br: BABY },
  }[item.category] || { bg: "#f5f5f5", fg: "#666", br: "#ddd" };

  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid " + (open ? BLU : "#E0E8F4"),
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: open ? "0 4px 20px rgba(32,97,213,.10)" : "0 1px 4px rgba(16,49,106,.05)",
    }}>
      <div onClick={onToggle} style={{
        padding: "18px 20px", cursor: "pointer",
        background: open ? "#EEF3FC" : "#fff",
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 38, height: 38, flexShrink: 0, borderRadius: 8,
            background: open ? BLU : "#EBF0F8",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <CatIcon size={16} color={open ? "#fff" : NAV} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 5, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#8A9BB5", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em" }}>{item.month}</span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, textTransform: "uppercase", letterSpacing: ".05em", background: catStyle.bg, color: catStyle.fg, border: "1px solid " + catStyle.br }}>{item.category}</span>
              {item.money && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#EDFAF0", color: "#1A7A3C", border: "1px solid #A8E0BD" }}>+ {item.money} млн ₽</span>}
              {item.saved && <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: "#EEF3FC", color: BLU, border: "1px solid " + BABY }}>Спасено {item.saved} млн ₽</span>}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: NAV, lineHeight: 1.3 }}>{item.client}</div>
            <div style={{ fontSize: 13, color: "#6B7FA3", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: open ? "normal" : "nowrap" }}>{item.business}</div>
          </div>
        </div>
        <div style={{
          flexShrink: 0, width: 26, height: 26, borderRadius: "50%",
          background: open ? BLU : "#EBF0F8",
          display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4,
        }}>
          {open ? <ChevronUp size={13} color="#fff" /> : <ChevronDown size={13} color={NAV} />}
        </div>
      </div>

      {open && (
        <div style={{
          borderTop: "1px solid " + BABY,
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12,
          background: PORC,
        }}>
          <div style={{ background: "#fff", borderRadius: 10, padding: "16px", border: "1px solid #E0E8F4" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
              <AlertTriangle size={13} color="#E58A00" />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: "#7A5800" }}>Запрос и контекст</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#374D6B", lineHeight: 1.6 }}>{item.request}</p>
            <div style={{ marginTop: 10, paddingTop: 9, borderTop: "1px solid #EEF2F8", display: "flex", gap: 5, alignItems: "flex-start" }}>
              <Building2 size={12} color="#8A9BB5" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: "#8A9BB5", lineHeight: 1.5 }}>{item.business}</span>
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 10, padding: "16px", border: "1.5px solid " + BABY }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
              <Briefcase size={13} color={BLU} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: NAV }}>Решения Тач Ойл</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#374D6B", lineHeight: 1.6 }}>{item.solution}</p>
          </div>
          <div style={{ background: NAV, borderRadius: 10, padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 9 }}>
              <Award size={13} color={BABY} />
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".08em", color: BABY }}>Эффект для клиента</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#D4E2F5", lineHeight: 1.6 }}>{item.result}</p>
            {(item.money || item.saved) && (
              <div style={{ marginTop: 10, paddingTop: 9, borderTop: "1px solid rgba(166,194,242,.2)" }}>
                {item.money && <div style={{ fontSize: 13, fontWeight: 700, color: "#7DDFA0" }}>Контракт: {item.money} млн ₽</div>}
                {item.saved && <div style={{ fontSize: 13, fontWeight: 700, color: BABY }}>Сохранено: {item.saved} млн ₽</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [activeCat, setActiveCat] = useState("Все");
  const [activeMon, setActiveMon] = useState("Все");
  const [openId, setOpenId] = useState(null);

  const filtered = useMemo(() =>
    CASES.filter(c =>
      (activeCat === "Все" || c.category === activeCat) &&
      (activeMon === "Все" || c.month === activeMon)
    ), [activeCat, activeMon]);

  const toggle = (id) => setOpenId(p => p === id ? null : id);

  const kpis = [
    { label: "Сумма контрактов",    to: 450, prefix: "> ", suffix: " млн ₽", sub: "Q1 2026",         Ic: TrendingUp,  accent: BLU },
    { label: "Сохранённый капитал", to: 4,   prefix: "",   suffix: " млн ₽", sub: "Защита активов",  Ic: ShieldCheck, accent: NAV },
    { label: "Успешных кейсов",     to: 22,  prefix: "",   suffix: "",        sub: "Январь — Апрель", Ic: CheckCircle, accent: "#1A7A3C" },
  ];

  return (
    <div style={{ fontFamily: "-apple-system,'Segoe UI',system-ui,sans-serif", background: PORC, minHeight: "100vh", color: NAV }}>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(253,250,245,.97)", borderBottom: "1px solid " + BABY }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 66, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <img src={logo} alt="Touch Oil Logo" style={{ height: 38 }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7FA3", fontSize: 13 }}>
              <Globe size={12} color="#6B7FA3" /><span>www.touchoil.pro</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#6B7FA3", fontSize: 13 }}>
              <Mail size={12} color="#6B7FA3" /><span>info@touchoil.ru</span>
            </div>
            <div style={{ padding: "7px 13px", background: NAV, borderRadius: 7, display: "flex", alignItems: "center", gap: 6 }}>
              <Calendar size={12} color={BABY} />
              <span style={{ fontSize: 12, color: BABY, fontWeight: 600 }}>Q1 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ background: NAV, padding: "60px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(" + BABY + " 1px, transparent 1px), linear-gradient(90deg, " + BABY + " 1px, transparent 1px)", backgroundSize: "48px 48px", opacity: .05, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -80, top: -80, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(32,97,213,.3) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 26, height: 2, background: BABY }} />
            <span style={{ fontSize: 11, color: BABY, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>Аналитический отчёт · Q1 2026</span>
          </div>
          <h1 style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, color: "#fff", lineHeight: 1.2, margin: "0 0 16px", maxWidth: 580, letterSpacing: "-.02em" }}>
            Наш главный продукт — решения и деловая информация
          </h1>
          <p style={{ fontSize: 15, color: "#A8C0E0", lineHeight: 1.7, maxWidth: 500, margin: "0 0 26px" }}>
            «Тач Ойл» — специализированный консультант для компаний нефтегазового сектора.
            Обеспечиваем победы в тендерах, защиту активов и стратегическую аналитику.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Тендерное сопровождение","Управление рисками","Аналитика закупок"].map((t,i) => (
              <span key={i} style={{ padding: "7px 13px", fontSize: 12, fontWeight: 500, color: BABY, background: "rgba(166,194,242,.12)", border: "1px solid rgba(166,194,242,.28)", borderRadius: 6 }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 72px" }}>

        {/* KPI */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, marginBottom: 24 }}>
          {kpis.map((k, i) => {
            const KpiIc = k.Ic;
            return (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", border: "1.5px solid #E0E8F4", boxShadow: "0 2px 10px rgba(16,49,106,.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#6B7FA3", fontWeight: 500 }}>{k.label}</p>
                  <div style={{ width: 32, height: 32, borderRadius: 7, background: "#EBF0F8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <KpiIc size={14} color={k.accent} />
                  </div>
                </div>
                <div style={{ fontSize: 33, fontWeight: 700, color: NAV, letterSpacing: "-.02em", lineHeight: 1 }}>
                  <Counter to={k.to} prefix={k.prefix} suffix={k.suffix} />
                </div>
                <div style={{ fontSize: 11, color: "#8A9BB5", marginTop: 5 }}>{k.sub}</div>
                <div style={{ height: 3, background: k.accent + "22", borderRadius: 2, marginTop: 12 }}>
                  <div style={{ height: "100%", width: "70%", background: k.accent, borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* CHARTS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 24 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", border: "1.5px solid #E0E8F4", boxShadow: "0 2px 10px rgba(16,49,106,.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <BarChart3 size={14} color={BLU} />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: NAV }}>Динамика проектов по месяцам</h3>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#8A9BB5" }}>Постоянный рост числа реализованных кейсов</p>
            <MonthBars />
          </div>
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", border: "1.5px solid #E0E8F4", boxShadow: "0 2px 10px rgba(16,49,106,.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <Layers size={14} color={BLU} />
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: NAV }}>Структура портфеля услуг</h3>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#8A9BB5" }}>Сбалансированное покрытие направлений</p>
            <PortfolioBars />
          </div>
        </div>

        {/* CASES */}
        <div style={{ background: "#fff", borderRadius: 14, padding: "26px 22px", border: "1.5px solid #E0E8F4", boxShadow: "0 2px 10px rgba(16,49,106,.05)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 20 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <FileText size={16} color={BLU} />
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: NAV, letterSpacing: "-.01em" }}>Реестр реализованных кейсов</h2>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#6B7FA3" }}>Детальный разбор контекста, решений и полученных эффектов · {filtered.length} кейса</p>
            </div>
            <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
              {[{Ic:Filter, val:activeCat, set:setActiveCat, opts:CATS},{Ic:Calendar, val:activeMon, set:setActiveMon, opts:MONTHS}].map(({Ic,val,set,opts},i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: "1.5px solid #E0E8F4", borderRadius: 7, padding: "7px 10px" }}>
                  <Ic size={12} color={NAV} />
                  <select value={val} onChange={e => set(e.target.value)} style={{ border: "none", outline: "none", background: "transparent", fontSize: 13, fontWeight: 500, color: NAV, cursor: "pointer", fontFamily: "inherit" }}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Pills */}
          <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
            {CATS.map(c => {
              const act = activeCat === c;
              const cnt = c === "Все" ? CASES.length : CASES.filter(x => x.category === c).length;
              return (
                <button key={c} onClick={() => setActiveCat(c)} style={{
                  padding: "6px 12px", borderRadius: 7, cursor: "pointer",
                  fontFamily: "inherit", fontSize: 13, fontWeight: 500,
                  border: "1.5px solid " + (act ? BLU : "#E0E8F4"),
                  background: act ? BLU : "#fff",
                  color: act ? "#fff" : "#6B7FA3",
                }}>
                  {c} <span style={{ fontSize: 11, fontWeight: 700, color: act ? "rgba(255,255,255,.6)" : "#8A9BB5" }}>{cnt}</span>
                </button>
              );
            })}
          </div>

          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {filtered.length === 0
              ? <div style={{ textAlign: "center", padding: "40px 24px", background: PORC, borderRadius: 10, border: "1.5px dashed " + BABY }}>
                  <Search size={20} color="#8A9BB5" />
                  <p style={{ margin: "9px 0 0", color: "#6B7FA3", fontWeight: 500 }}>По выбранным фильтрам кейсы не найдены</p>
                </div>
              : filtered.map(item => <CaseCard key={item.id} item={item} open={openId === item.id} onToggle={() => toggle(item.id)} />)
            }
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ background: NAV, padding: "38px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 26, marginBottom: 26 }}>
            <div>
              <div style={{ marginBottom: 12 }}>
                <img src={logo} alt="Touch Oil Logo" style={{ height: 32 }} />
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#6B8EC0", lineHeight: 1.65 }}>Стратегический нефтегазовый консалтинг. Трансформируем данные в победы.</p>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: BABY, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 11 }}>Направления</div>
              {["Тендерное сопровождение","Управление корпоративными рисками","Анализ рынка и закупок","Должная осмотрительность"].map((t,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 7 }}>
                  <ArrowRight size={9} color={BABY} />
                  <span style={{ fontSize: 13, color: "#7B9CC4" }}>{t}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: BABY, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: 11 }}>Контакты</div>
              {[[Phone,"+7 (800) 123-45-67"],[Mail,"info@touchoil.ru"],[Globe,"www.touchoil.ru"],[MapPin,"Москва, Россия"]].map(([Ic,text],i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Ic size={11} color={BABY} />
                  <span style={{ fontSize: 13, color: "#7B9CC4" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: 18, borderTop: "1px solid rgba(166,194,242,.15)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
            <span style={{ fontSize: 12, color: "#4A6B96" }}>© 2026 ООО «Тач Ойл». Все права защищены.</span>
            <span style={{ fontSize: 12, color: "#4A6B96" }}>Аналитический дашборд · Отчёт Q1 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}