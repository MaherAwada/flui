import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  SafeAreaView,
  Switch,
} from "react-native";

type Screen = "landing" | "home" | "map" | "planner" | "compare" | "migrate" | "migrateResult" | "station";

type Eletroposto = {
  id: number;
  nome: string;
  distancia: string;
  cidade: string;
  estado: string;
  endereco: string;
  score: number;
  carregadores: number;
  disponiveis: number;
  conectores: string[];
  potencia: string;
  horario: string;
  comodidades: string[];
};

const eletropostos: Eletroposto[] = [
  {
    id: 1,
    nome: "Shopping Iguatemi",
    distancia: "1.2 km",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Av. Brigadeiro Faria Lima, 2232",
    score: 9.4,
    carregadores: 4,
    disponiveis: 3,
    conectores: ["CCS2", "CHAdeMO", "Tipo 2", "Tesla"],
    potencia: "150 kW",
    horario: "08:00 - 22:00",
    comodidades: ["Estacionamento", "Shopping", "Alimentação"],
  },
  {
    id: 2,
    nome: "Hotel Fasano",
    distancia: "2.8 km",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Rua Vittorio Fasano, 88",
    score: 9.1,
    carregadores: 3,
    disponiveis: 2,
    conectores: ["CCS2", "Tipo 2", "Tesla"],
    potencia: "100 kW",
    horario: "24 horas",
    comodidades: ["Manobrista", "Hotel", "Restaurante"],
  },
  {
    id: 3,
    nome: "Posto Shell",
    distancia: "3.5 km",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Av. Paulista, 1000",
    score: 8.8,
    carregadores: 2,
    disponiveis: 1,
    conectores: ["CCS2", "CHAdeMO"],
    potencia: "50 kW",
    horario: "24 horas",
    comodidades: ["Posto de Combustível", "Conveniência"],
  },
];

const colors = {
  bg: "#08020F",
  bg2: "#12001E",
  card: "#1A0628",
  card2: "#220735",
  border: "#5B1980",
  borderActive: "#B546FF",
  purple: "#B646FF",
  purple2: "#DCA0FF",
  green: "#23FFC2",
  yellow: "#FFD75A",
  red: "#FF5C6B",
  muted: "#C9B8D6",
  dim: "#8F7E9B",
  white: "#FFFFFF",
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [selectedStation, setSelectedStation] = useState<Eletroposto | null>(null);

  function goToStation(station: Eletroposto) {
    setSelectedStation(station);
    setScreen("station");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar style="light" />

      {screen === "landing" && <Landing onStart={() => setScreen("home")} />}
      {screen === "home" && <Home setScreen={setScreen} openStation={goToStation} />}
      {screen === "map" && <MapScreen setScreen={setScreen} />}
      {screen === "planner" && <PlannerScreen setScreen={setScreen} />}
      {screen === "compare" && <CompareScreen setScreen={setScreen} />}
      {screen === "migrate" && <MigrateScreen setScreen={setScreen} />}
      {screen === "migrateResult" && <MigrateResultScreen setScreen={setScreen} />}
      {screen === "station" && selectedStation && (
        <StationScreen station={selectedStation} setScreen={setScreen} />
      )}

      {screen !== "landing" && screen !== "station" && (
        <BottomNav active={screen} setScreen={setScreen} />
      )}
    </SafeAreaView>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 36, paddingBottom: 48 }}>
      <View style={{ alignItems: "center", marginTop: 6 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
          <View style={styles.logoBox}>
            <Text style={{ color: colors.white, fontSize: 36 }}>ϟ</Text>
          </View>
          <Text style={{ color: colors.white, fontSize: 58, fontWeight: "900", letterSpacing: 2 }}>
            FLUI
          </Text>
        </View>

        <Text style={{ color: colors.purple2, fontSize: 25, textAlign: "center", marginTop: 34, lineHeight: 34 }}>
          O sistema operacional da mobilidade elétrica
        </Text>
        <Text style={{ color: colors.muted, fontSize: 18, textAlign: "center", marginTop: 38, lineHeight: 28 }}>
          Confiança, tecnologia e fluidez para quem deseja migrar para um veículo elétrico
        </Text>

        <Pressable style={[styles.primaryButton, { width: 186, marginTop: 50 }]} onPress={onStart}>
          <Text style={styles.primaryButtonText}>▯  App Mobile</Text>
        </Pressable>

        <Pressable style={[styles.outlineButton, { width: 220, marginTop: 18 }]}>
          <Text style={{ color: colors.purple, fontSize: 17 }}>▥  Dashboard Web</Text>
        </Pressable>
      </View>

      <FeatureCard icon="ϟ" title="Mapa Inteligente" desc="Encontre eletropostos com avaliações reais e FLUI Score" />
      <FeatureCard icon="▥" title="Planejador de Viagem" desc="Descubra se você chega ao destino e onde parar" />
      <FeatureCard icon="▯" title="Vale Migrar?" desc="Compare custos e descubra sua economia real" />
    </ScrollView>
  );
}

function Home({ setScreen, openStation }: { setScreen: (s: Screen) => void; openStation: (s: Eletroposto) => void }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 24, paddingBottom: 120 }}>
      <Text style={styles.pageTitle}>Olá, motorista! ⚡</Text>
      <Text style={styles.subtitle}>Pronto para fluir na mobilidade elétrica?</Text>

      <View style={[styles.inputFake, { marginTop: 36 }]}> 
        <Text style={{ color: colors.muted, fontSize: 17 }}>⌕  Buscar eletropostos...</Text>
      </View>

      <SectionTitle title="Acessos Rápidos" />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
        <QuickCard icon="ϟ" title="Recarga" desc="Encontrar pontos próximos" onPress={() => setScreen("map")} />
        <QuickCard icon="⌘" title="Planejar Viagem" desc="Calcular rota e paradas" onPress={() => setScreen("planner")} />
        <QuickCard icon="⌬" title="Comparar Elétricos" desc="Qual EV é ideal para você?" onPress={() => setScreen("compare")} />
        <QuickCard icon="↗" title="Vale Migrar?" desc="Calcular economia" onPress={() => setScreen("migrate")} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 34 }}>
        <Text style={styles.sectionTitle}>Carregadores Próximos</Text>
        <Text style={{ color: colors.purple, fontSize: 15 }}>Ver todos</Text>
      </View>

      <View style={{ gap: 14, marginTop: 18 }}>
        {eletropostos.map((item) => (
          <Pressable key={item.id} onPress={() => openStation(item)} style={styles.stationCard}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ color: colors.white, fontSize: 20, fontWeight: "700" }}>{item.nome}</Text>
              <View style={styles.scorePill}>
                <Text style={{ color: colors.green, fontWeight: "800" }}>★ {item.score}</Text>
              </View>
            </View>
            <Text style={{ color: colors.muted, marginTop: 9 }}>⌾  {item.distancia}</Text>
            <View style={{ flexDirection: "row", gap: 10, alignItems: "center", marginTop: 14 }}>
              <View style={styles.availablePill}>
                <Text style={{ color: colors.green, fontWeight: "700", fontSize: 12 }}>
                  {item.disponiveis} disponível(is)
                </Text>
              </View>
              <Text style={{ color: colors.muted }}>{item.conectores.length} conectores</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <View style={[styles.largeCard, { flexDirection: "row", marginTop: 34 }]}> 
        <View style={styles.starBox}><Text style={{ fontSize: 28, color: colors.white }}>★</Text></View>
        <View style={{ flex: 1, marginLeft: 18 }}>
          <Text style={{ color: colors.white, fontSize: 20, fontWeight: "700" }}>FLUI Score</Text>
          <Text style={{ color: colors.muted, lineHeight: 22, marginTop: 8 }}>
            Nossa avaliação inteligente garante que você encontre os melhores eletropostos com base em segurança, conforto e confiabilidade.
          </Text>
          <Pressable style={[styles.smallButton, { marginTop: 16 }]} onPress={() => setScreen("map")}>
            <Text style={{ color: colors.white, fontWeight: "700" }}>Explorar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function MapScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Header title="Mapa de Recarga" subtitle="Encontre o melhor ponto" onBack={() => setScreen("home")} right="☷" />
      <View style={{ flex: 1, position: "relative" }}>
        <Marker top={210} left={240} score="9.4" color={colors.green} />
        <Marker top={380} left={140} score="9.1" color={colors.green} />
        <Marker top={300} left={310} score="8.8" color={colors.red} />
        <View style={{ position: "absolute", top: 342, left: 210, width: 18, height: 18, borderRadius: 20, backgroundColor: colors.purple, borderWidth: 3, borderColor: colors.white }} />
        <Pressable style={[styles.primaryButton, { position: "absolute", left: 16, right: 16, bottom: 72 }]}>
          <Text style={styles.primaryButtonText}>⌁  Perto de Mim</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PlannerScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const [air, setAir] = useState(true);
  const [hill, setHill] = useState(false);
  const [bags, setBags] = useState(false);
  const [people, setPeople] = useState("2");

  return (
    <View style={{ flex: 1 }}>
      <Header title="Planejador de Viagem" subtitle="Chegue com segurança" onBack={() => setScreen("home")} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <SectionTitle title="Para onde você vai?" />
        <View style={styles.routeCard}>
          <Text style={{ color: colors.muted, fontSize: 16 }}>●  São Paulo, SP</Text>
          <Text style={{ color: colors.border, marginVertical: 10 }}>┆</Text>
          <Text style={{ color: colors.muted, fontSize: 16 }}>⌾  Ubatuba, SP</Text>
        </View>

        <SectionTitle title="Qual é seu veículo?" />
        <View style={styles.inputFake}><Text style={{ color: colors.purple }}>▱</Text></View>

        <SectionTitle title="Quanto de bateria você tem agora?" />
        <SliderCard label="Nível de carga" value="72%" min="0%" mid="50%" max="100%" green />

        <SectionTitle title="Condições da viagem" />
        <ToggleRow label="Vai usar ar-condicionado?" emoji="♨" value={air} onValueChange={setAir} />
        <ToggleRow label="Vai pegar serra ou subida?" emoji="⛰️" value={hill} onValueChange={setHill} />
        <ToggleRow label="Vai levar muita bagagem?" emoji="🧳" value={bags} onValueChange={setBags} />

        <View style={styles.optionBox}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: colors.white, fontSize: 17 }}>♙  Quantas pessoas no carro?</Text>
            <Text style={{ color: colors.purple, fontSize: 24, fontWeight: "800" }}>{people}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 18 }}>
            {["1", "2", "3", "4", "5+"].map((p) => (
              <Choice key={p} label={p} active={people === p} onPress={() => setPeople(p)} compact />
            ))}
          </View>
        </View>

        <SectionTitle title="Como você prefere viajar?" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <Choice label="Mais rápido" icon="ϟ" />
          <Choice label="Mais econômico" icon="💰" />
          <Choice label="Mais seguro" icon="♢" />
          <Choice label="Sem risco" icon="▱" active green />
        </View>

        <View style={[styles.optionBox, { borderColor: colors.green, backgroundColor: "#062524", marginTop: 22 }]}> 
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: "700" }}>🛡  Modo Ansiedade Zero™</Text>
          <Text style={{ color: colors.muted, marginTop: 6 }}>Me leve sem risco</Text>
        </View>

        <Pressable style={[styles.primaryButton, { marginTop: 28 }]}>
          <Text style={styles.primaryButtonText}>Calcular Viagem</Text>
        </Pressable>
        <Text style={{ color: colors.muted, textAlign: "center", marginTop: 12 }}>Descubra se você chega com segurança</Text>
      </ScrollView>
    </View>
  );
}

function CompareScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Comparador de Elétricos" subtitle="FLUI EV Match" onBack={() => setScreen("home")} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={styles.heroCard}>
          <Text style={{ color: colors.white, fontSize: 22, fontWeight: "800" }}>Consultoria Inteligente</Text>
          <Text style={{ color: colors.muted, marginTop: 12, fontSize: 16, lineHeight: 23 }}>Responda algumas perguntas e descubra qual EV é perfeito para sua rotina</Text>
        </View>

        <SectionTitle title="Como você usa seu carro?" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <Choice label="Trabalho diário" icon="▣" />
          <Choice label="Uso com família" icon="♙" />
          <Choice label="Viagens frequentes" icon="✈" />
          <Choice label="Apenas cidade" icon="▥" active />
        </View>

        <SectionTitle title="Quantos km você roda por dia?" />
        <SliderCard label="Quilometragem diária" value="35 km" min="10 km" mid="75 km" max="150 km" />

        <SectionTitle title="Você mora em:" />
        <Choice label="Casa" icon="⌂" active full />
        <Choice label="Apartamento com vaga" icon="▥" full />
        <Choice label="Apartamento sem carregador" icon="▥" full />

        <SectionTitle title="Qual seu orçamento?" />
        <SliderCard label="Valor máximo" value="R$ 270k" min="R$ 150k" mid="R$ 275k" max="R$ 400k" />

        <SectionTitle title="O que mais importa para você?" />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
          <Choice label="Economia" icon="💰" />
          <Choice label="Autonomia" icon="⚡" />
          <Choice label="Tecnologia" icon="📱" />
          <Choice label="Conforto" icon="✨" />
          <Choice label="Revenda" icon="📈" active />
          <Choice label="Segurança" icon="🛡" />
        </View>

        <Pressable style={[styles.primaryButton, { marginTop: 28 }]} onPress={() => setScreen("migrateResult")}>
          <Text style={styles.primaryButtonText}>Descobrir Melhor Opção</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function MigrateScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Vale Migrar?" subtitle="Transition Score" onBack={() => setScreen("home")} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={[styles.heroCard, { borderColor: "#8B6330", backgroundColor: "#271B19" }]}> 
          <Text style={{ color: colors.white, fontSize: 22, fontWeight: "800" }}>◎  Diagnóstico Estratégico</Text>
          <Text style={{ color: colors.muted, marginTop: 12, lineHeight: 23 }}>Descubra se já faz sentido migrar para um EV e quanto você economizará</Text>
        </View>

        <SectionTitle title="Seu carro atual" />
        <View style={styles.inputFake}><Text style={{ color: colors.muted, fontSize: 17 }}>▱  Honda Civic 2020</Text></View>

        <SectionTitle title="Tipo de combustível" />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Choice label="Gasolina" icon="⛽" active compact />
          <Choice label="Etanol" icon="⛽" compact />
          <Choice label="Flex" icon="⛽" compact />
        </View>

        <SectionTitle title="Quanto você gasta por mês?" />
        <SliderCard label="Gasto mensal" value="R$ 800" min="R$ 200" mid="R$ 1.100" max="R$ 2.000" yellow />

        <SectionTitle title="Quantos km você roda por mês?" />
        <SliderCard label="Quilometragem mensal" value="1.200 km" min="300 km" mid="2.650 km" max="5.000 km" />

        <SectionTitle title="Seu perfil de uso" />
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Choice label="Só cidade\n80% urbano" icon="▥" active />
          <Choice label="Misto\nCidade + estrada" icon="🛣" />
        </View>

        <SectionTitle title="Onde você mora?" />
        <Choice label="Casa\nFácil instalar carregador" icon="⌂" full active green />
        <Choice label="Apartamento com vaga\nPossível instalar tomada" icon="▥" full />
        <Choice label="Apartamento sem carregador\nDepende de eletropostos" icon="▥" full />

        <Pressable style={[styles.primaryButton, { marginTop: 28 }]} onPress={() => setScreen("migrateResult")}>
          <Text style={styles.primaryButtonText}>Calcular Minha Economia</Text>
        </Pressable>
        <Text style={{ color: colors.muted, textAlign: "center", marginTop: 12 }}>Diagnóstico personalizado em segundos</Text>
      </ScrollView>
    </View>
  );
}

function MigrateResultScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Vale Migrar?" subtitle="Transition Score" onBack={() => setScreen("migrate")} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        <View style={[styles.bigScoreCard, { marginTop: 16 }]}> 
          <Text style={{ color: colors.green, fontSize: 52, textAlign: "center" }}>✧</Text>
          <Text style={{ color: colors.muted, textAlign: "center", fontSize: 16 }}>Seu Transition Score™</Text>
          <Text style={{ color: colors.green, fontSize: 76, fontWeight: "900", textAlign: "center", marginTop: 8 }}>8.9</Text>
          <View style={[styles.availablePill, { alignSelf: "center", paddingHorizontal: 20, paddingVertical: 10 }]}> 
            <Text style={{ color: colors.white, fontSize: 16, fontWeight: "700" }}>✓ Altamente Recomendado</Text>
          </View>
          <Text style={{ color: colors.muted, textAlign: "center", fontSize: 18, lineHeight: 26, marginTop: 18 }}>Migrar para EV faz muito sentido para você!</Text>
        </View>

        <SectionTitle title="Comparação Mensal" />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CostCard title="Combustão" value="R$ 800" total="Total: R$ 1150" red />
          <CostCard title="Elétrico" value="R$ 280" total="Total: R$ 460" green />
        </View>

        <View style={[styles.bigScoreCard, { alignItems: "flex-start", marginTop: 20 }]}> 
          <Text style={{ color: colors.muted }}>Economia mensal</Text>
          <Text style={{ color: colors.green, fontSize: 39, fontWeight: "900", marginTop: 10 }}>R$ 690</Text>
          <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)", alignSelf: "stretch", marginVertical: 18 }} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignSelf: "stretch" }}>
            <MiniStat value="R$ 8280" label="Por ano" />
            <MiniStat value="R$ 24840" label="Em 3 anos" />
            <MiniStat value="R$ 41400" label="Em 5 anos" />
          </View>
        </View>

        <View style={styles.largeCard}>
          <Text style={{ color: colors.white, fontSize: 22, fontWeight: "800" }}>✧  Recomendação Inteligente</Text>
          <Text style={{ color: colors.muted, fontSize: 17, lineHeight: 26, marginTop: 18 }}>Com base no seu perfil, o <Text style={{ color: colors.white, fontWeight: "800" }}>BYD Dolphin</Text> é a melhor opção. Você teria ROI positivo em apenas <Text style={{ color: colors.green, fontWeight: "800" }}>2,8 anos.</Text></Text>
          <Pressable style={[styles.primaryButton, { marginTop: 20 }]}>
            <Text style={styles.primaryButtonText}>Ver Comparação Detalhada</Text>
          </Pressable>
        </View>

        <View style={styles.largeCard}>
          <Text style={{ color: colors.white, fontSize: 21, fontWeight: "800" }}>▣  Seu Roadmap de Transição</Text>
          {["Teste drive", "Instalação do carregador", "Vender carro atual", "Comprar seu EV"].map((item, index) => (
            <View key={item} style={{ flexDirection: "row", gap: 12, marginTop: 18, alignItems: "center" }}>
              <View style={styles.stepCircle}><Text style={{ color: colors.white, fontWeight: "800" }}>{index + 1}</Text></View>
              <Text style={{ color: colors.white, fontSize: 16 }}>{item}</Text>
            </View>
          ))}
        </View>

        <Pressable style={[styles.outlineButton, { marginTop: 28 }]} onPress={() => setScreen("migrate")}>
          <Text style={{ color: colors.purple, fontSize: 17, textAlign: "center" }}>Nova Simulação</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function StationScreen({ station, setScreen }: { station: Eletroposto; setScreen: (s: Screen) => void }) {
  return (
    <View style={{ flex: 1 }}>
      <Header title={station.nome} subtitle={station.endereco} onBack={() => setScreen("home")} />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        <View style={styles.bigScoreCard}>
          <Text style={{ color: colors.green, fontSize: 52, textAlign: "center" }}>★</Text>
          <Text style={{ color: colors.green, fontSize: 64, fontWeight: "900", textAlign: "center" }}>{station.score}</Text>
          <Text style={{ color: colors.muted, textAlign: "center", fontSize: 16 }}>FLUI Score</Text>
        </View>
        <Info label="Carregadores" value={`${station.disponiveis}/${station.carregadores} disponíveis`} />
        <Info label="Potência" value={station.potencia} />
        <Info label="Horário" value={station.horario} />
        <Info label="Conectores" value={station.conectores.join(" • ")} />
        <Info label="Comodidades" value={station.comodidades.join(" • ")} />
      </ScrollView>
    </View>
  );
}

function Header({ title, subtitle, onBack, right }: { title: string; subtitle: string; onBack: () => void; right?: string }) {
  return (
    <View style={{ padding: 16, paddingTop: 18, borderBottomWidth: 1, borderBottomColor: "#2B0A40", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
        <Pressable onPress={onBack} style={styles.backButton}><Text style={{ color: colors.white, fontSize: 28 }}>‹</Text></Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.white, fontSize: 21, fontWeight: "800" }}>{title}</Text>
          <Text style={{ color: colors.muted, fontSize: 15, marginTop: 3 }}>{subtitle}</Text>
        </View>
      </View>
      {right && <View style={styles.backButton}><Text style={{ color: colors.white }}>{right}</Text></View>}
    </View>
  );
}

function BottomNav({ active, setScreen }: { active: Screen; setScreen: (s: Screen) => void }) {
  const items: { key: Screen; label: string; icon: string }[] = [
    { key: "home", label: "Início", icon: "⌂" },
    { key: "map", label: "Mapa", icon: "⌾" },
    { key: "compare", label: "Comparar", icon: "▱" },
    { key: "migrate", label: "Meu EV", icon: "♙" },
  ];
  return (
    <View style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 74, backgroundColor: "#1B032A", borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-around", paddingTop: 10 }}>
      {items.map((item) => {
        const on = active === item.key || (active === "migrateResult" && item.key === "migrate");
        return (
          <Pressable key={item.key} onPress={() => setScreen(item.key)} style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ color: on ? colors.purple : colors.muted, fontSize: 22 }}>{item.icon}</Text>
            <Text style={{ color: on ? colors.purple : colors.muted, fontSize: 12, marginTop: 4 }}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function QuickCard({ icon, title, desc, onPress }: { icon: string; title: string; desc: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.quickCard}>
      <View style={styles.quickIcon}><Text style={{ color: colors.green, fontSize: 28 }}>{icon}</Text></View>
      <Text style={{ color: colors.white, fontSize: 20, fontWeight: "800", marginTop: 18 }}>{title}</Text>
      <Text style={{ color: colors.muted, marginTop: 7, lineHeight: 18 }}>{desc}</Text>
    </Pressable>
  );
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.quickIcon}><Text style={{ color: colors.green, fontSize: 28 }}>{icon}</Text></View>
      <Text style={{ color: colors.white, fontSize: 21, fontWeight: "800", marginTop: 24, textAlign: "center" }}>{title}</Text>
      <Text style={{ color: colors.muted, fontSize: 16, textAlign: "center", lineHeight: 23, marginTop: 12 }}>{desc}</Text>
    </View>
  );
}

function Choice({ label, icon, active, green, full, compact, onPress }: { label: string; icon?: string; active?: boolean; green?: boolean; full?: boolean; compact?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.choice, full && { width: "100%", alignItems: "flex-start", height: 58 }, compact && { flex: 1, minWidth: 0 }, active && { borderColor: green ? colors.green : colors.borderActive, backgroundColor: green ? "#062524" : colors.card }]}> 
      {icon && <Text style={{ color: green && active ? colors.green : colors.purple, fontSize: 22, marginBottom: 8 }}>{icon}</Text>}
      <Text style={{ color: active ? colors.white : colors.muted, fontSize: compact ? 13 : 15, textAlign: full ? "left" : "center", lineHeight: 22 }}>{label}</Text>
    </Pressable>
  );
}

function SliderCard({ label, value, min, mid, max, green, yellow }: { label: string; value: string; min: string; mid: string; max: string; green?: boolean; yellow?: boolean }) {
  return (
    <View style={[styles.sliderCard, green && { shadowColor: colors.purple, shadowOpacity: 0.45 }, yellow && { borderColor: "#8B6330" }]}> 
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: colors.muted, fontSize: 16 }}>{label}</Text>
        <Text style={{ color: yellow ? colors.yellow : green ? colors.green : colors.purple, fontSize: 30, fontWeight: "900" }}>{value}</Text>
      </View>
      <View style={{ height: 8, backgroundColor: "#2A0C3A", borderRadius: 20, marginTop: 22 }}>
        <View style={{ width: green ? "72%" : yellow ? "40%" : "48%", height: 8, borderRadius: 20, backgroundColor: green ? colors.green : yellow ? colors.yellow : colors.purple }} />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 16 }}>
        <Text style={styles.rangeText}>{min}</Text>
        <Text style={styles.rangeText}>{mid}</Text>
        <Text style={styles.rangeText}>{max}</Text>
      </View>
    </View>
  );
}

function ToggleRow({ label, emoji, value, onValueChange }: { label: string; emoji: string; value: boolean; onValueChange: (v: boolean) => void }) {
  return (
    <View style={styles.toggleRow}>
      <Text style={{ color: colors.white, fontSize: 17 }}>{emoji}  {label}</Text>
      <Switch value={value} onValueChange={onValueChange} trackColor={{ false: "#2A0C3A", true: colors.purple }} thumbColor={colors.white} />
    </View>
  );
}

function Marker({ top, left, score, color }: { top: number; left: number; score: string; color: string }) {
  return (
    <View style={{ position: "absolute", top, left, alignItems: "center" }}>
      <View style={{ backgroundColor: colors.card2, paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: colors.border, zIndex: 2 }}>
        <Text style={{ color: colors.white, fontWeight: "800", fontSize: 12 }}>⭐ {score}</Text>
      </View>
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: color, borderWidth: 3, borderColor: colors.white, marginTop: -5, shadowColor: color, shadowOpacity: 1, shadowRadius: 24 }} />
    </View>
  );
}

function CostCard({ title, value, total, red, green }: { title: string; value: string; total: string; red?: boolean; green?: boolean }) {
  return (
    <View style={[styles.costCard, red && { backgroundColor: "#2A0B1A", borderColor: "#69223B" }, green && { backgroundColor: "#092225", borderColor: "#126B65" }]}> 
      <Text style={{ color: colors.muted, fontSize: 15 }}>{green ? "⚡" : "⛽"}  {title}</Text>
      <Text style={{ color: green ? colors.green : colors.white, fontSize: 31, fontWeight: "900", marginTop: 16 }}>{value}</Text>
      <Text style={{ color: colors.muted, marginTop: 8 }}>{green ? "Eletricidade" : "Combustível"}</Text>
      <Text style={{ color: green ? colors.green : colors.white, fontSize: 17, fontWeight: "800", marginTop: 22 }}>{total}</Text>
    </View>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: colors.white, fontWeight: "900", fontSize: 19 }}>{value}</Text>
      <Text style={{ color: colors.muted, marginTop: 7 }}>{label}</Text>
    </View>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBox}>
      <Text style={{ color: colors.dim, fontSize: 14 }}>{label}</Text>
      <Text style={{ color: colors.white, fontSize: 17, marginTop: 7, lineHeight: 24 }}>{value}</Text>
    </View>
  );
}

const styles = {
  pageTitle: { color: colors.white, fontSize: 26, fontWeight: "800" as const },
  subtitle: { color: colors.muted, fontSize: 16, marginTop: 7 },
  sectionTitle: { color: colors.white, fontSize: 22, fontWeight: "800" as const, marginTop: 28, marginBottom: 14 },
  logoBox: { width: 66, height: 66, borderRadius: 18, backgroundColor: colors.purple, alignItems: "center" as const, justifyContent: "center" as const, shadowColor: colors.purple, shadowOpacity: 0.8, shadowRadius: 24 },
  primaryButton: { backgroundColor: colors.purple, borderRadius: 16, paddingVertical: 17, alignItems: "center" as const, shadowColor: colors.purple, shadowOpacity: 0.8, shadowRadius: 18 },
  primaryButtonText: { color: colors.white, fontSize: 17, fontWeight: "800" as const },
  outlineButton: { borderWidth: 2, borderColor: colors.purple, borderRadius: 16, paddingVertical: 17, alignItems: "center" as const },
  inputFake: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18 },
  quickCard: { width: "47%" as const, minHeight: 158, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18 },
  quickIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: "#254957", alignItems: "center" as const, justifyContent: "center" as const },
  stationCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18 },
  scorePill: { backgroundColor: "#184E5B", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
  availablePill: { backgroundColor: "#0A705F", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  largeCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 18, padding: 24, marginTop: 24 },
  starBox: { width: 54, height: 54, borderRadius: 15, backgroundColor: colors.purple, alignItems: "center" as const, justifyContent: "center" as const },
  smallButton: { backgroundColor: colors.purple, borderRadius: 10, paddingHorizontal: 18, paddingVertical: 12, alignSelf: "flex-start" as const },
  featureCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 28, marginTop: 26, alignItems: "center" as const },
  backButton: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, alignItems: "center" as const, justifyContent: "center" as const },
  heroCard: { backgroundColor: "#251135", borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 24 },
  choice: { width: "48%" as const, minHeight: 82, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 16, alignItems: "center" as const, justifyContent: "center" as const },
  sliderCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 20, shadowColor: colors.purple, shadowOpacity: 0.2, shadowRadius: 18 },
  rangeText: { color: colors.muted, fontSize: 12 },
  optionBox: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 16, marginTop: 10 },
  toggleRow: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.borderActive, borderRadius: 14, paddingVertical: 13, paddingHorizontal: 16, marginBottom: 10, flexDirection: "row" as const, justifyContent: "space-between" as const, alignItems: "center" as const },
  routeCard: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 20 },
  bigScoreCard: { backgroundColor: "#092825", borderWidth: 1, borderColor: colors.green, borderRadius: 16, padding: 24, shadowColor: colors.green, shadowOpacity: 0.35, shadowRadius: 20 },
  costCard: { flex: 1, borderWidth: 1, borderRadius: 16, padding: 20 },
  stepCircle: { width: 32, height: 32, borderRadius: 18, backgroundColor: "#553070", alignItems: "center" as const, justifyContent: "center" as const },
  infoBox: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 18, marginTop: 14 },
};