import {
    AntDesign,
    Entypo,
    Feather,
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const COLORS = {
  bg: '#F5F6FA',
  white: '#FFFFFF',
  black: '#171717',
  text: '#20222B',
  muted: '#9095A5',
  purple: '#5B4CF0',
  purpleDark: '#4E3EEA',
  purpleSoft: '#ECE8FF',
  yellowSoft: '#F6F6D8',
  green: '#11C68B',
  border: '#E6E8F0',
  cardBg: '#F3F4F8',
};

const IMAGES = {
  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop',
  burger2:
    'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
  burger3:
    'https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=1200&auto=format&fit=crop',
  pizza:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop',
  avatar:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop',
};

type TabKey = 'home' | 'cart' | 'profile';

type CartScreenProps = {
  qty: number;
  setQty: React.Dispatch<React.SetStateAction<number>>;
  subtotal: number;
  deliveryFee: number;
  total: number;
};

type ProfileScreenProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

type CategoryCardProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  pinkBorder?: boolean;
};

type PopularCardProps = {
  title: string;
  image: string;
};

type SummaryRowProps = {
  label: string;
  value: string;
  total?: boolean;
};

type ProfileMenuItemProps = {
  icon: React.ReactNode;
  label: string;
};

type BottomNavProps = {
  activeTab: TabKey;
  setActiveTab: React.Dispatch<React.SetStateAction<TabKey>>;
};

export default function IndexScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [qty, setQty] = useState(2);
  const [darkMode, setDarkMode] = useState(true);

  const subtotal = useMemo(() => qty * 28, [qty]);
  const deliveryFee = 6.2;
  const total = useMemo(() => subtotal + deliveryFee, [subtotal]);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'cart':
        return (
          <CartScreen
            qty={qty}
            setQty={setQty}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            total={total}
          />
        );
      case 'profile':
        return (
          <ProfileScreen darkMode={darkMode} setDarkMode={setDarkMode} />
        );
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
      <View style={styles.container}>
        <View style={styles.screenBody}>{renderScreen()}</View>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>9:00</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color={COLORS.black} />
          <Ionicons name="wifi" size={14} color={COLORS.black} />
          <Ionicons name="battery-full" size={16} color={COLORS.black} />
        </View>
      </View>

      <View style={styles.homeHeaderWrap}>
        <View style={styles.homeHeaderTop}>
          <Image source={{ uri: IMAGES.avatar }} style={styles.smallAvatar} />

          <View style={styles.headerCenter}>
            <Text style={styles.locationLabel}>Your Location</Text>
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={15}
                color={COLORS.purple}
              />
              <Text style={styles.locationValue}>Savar, Dhaka</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.notifyBtn}>
            <Feather name="bell" size={18} color={COLORS.text} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Feather name="search" size={18} color="rgba(255,255,255,0.85)" />
        <TextInput
          placeholder="Search your food"
          placeholderTextColor="rgba(255,255,255,0.65)"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Feather name="sliders" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryRow}>
        <CategoryCard
          icon={
            <MaterialCommunityIcons name="pizza" size={24} color="#11C68B" />
          }
          label="PIZZA"
          active
        />
        <CategoryCard
          icon={
            <MaterialCommunityIcons
              name="hamburger"
              size={24}
              color={COLORS.text}
            />
          }
          label="BURGER"
        />
        <CategoryCard
          icon={
            <MaterialCommunityIcons
              name="glass-cocktail"
              size={24}
              color={COLORS.text}
            />
          }
          label="DRINK"
          pinkBorder
        />
        <CategoryCard
          icon={
            <MaterialCommunityIcons name="rice" size={24} color={COLORS.text} />
          }
          label="RICE"
        />
      </View>

      <View style={styles.bannerCard}>
        <View style={styles.bannerTextBox}>
          <Text style={styles.bannerTitle}>BURGER</Text>
          <Text style={styles.bannerSubtitle}>Today&apos;s Hot offer</Text>

          <View style={styles.bannerRatingRow}>
            <AntDesign name="star" size={13} color="#F7B500" />
            <Text style={styles.bannerRatingText}>4.8 (1k+ Rating)</Text>
          </View>
        </View>

        <View style={styles.bannerDiscount}>
          <Text style={styles.bannerDiscountText}>
            10%{'\n'}OFF
          </Text>
        </View>

        <Image source={{ uri: IMAGES.burger }} style={styles.bannerImage} />
      </View>

      <View style={styles.dotRow}>
        <View style={styles.dot} />
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
        <Text style={styles.sectionLink}>View All</Text>
      </View>

      <View style={styles.popularRow}>
        <PopularCard title="BURGER" image={IMAGES.burger} />
        <PopularCard title="PIZZA" image={IMAGES.pizza} />
      </View>
    </ScrollView>
  );
}

function CartScreen({
  qty,
  setQty,
  subtotal,
  deliveryFee,
  total,
}: CartScreenProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>9:00</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color={COLORS.black} />
          <Ionicons name="wifi" size={14} color={COLORS.black} />
          <Ionicons name="battery-full" size={16} color={COLORS.black} />
        </View>
      </View>

      <View style={styles.screenHeader}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.screenHeaderTitle}>Shopping Cart</Text>

        <TouchableOpacity>
          <Feather name="trash-2" size={18} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.cartHeroCard}>
        <Image source={{ uri: IMAGES.burger }} style={styles.cartHeroImage} />

        <View style={[styles.bannerDiscount, styles.cartDiscount]}>
          <Text style={styles.bannerDiscountText}>
            10%{'\n'}OFF
          </Text>
        </View>

        <View style={styles.thumbRow}>
          <Image source={{ uri: IMAGES.burger }} style={styles.thumbImage} />
          <Image source={{ uri: IMAGES.burger2 }} style={styles.thumbImage} />
          <Image source={{ uri: IMAGES.burger3 }} style={styles.thumbImage} />
        </View>
      </View>

      <View style={styles.cartInfoWrap}>
        <View style={styles.cartTitleRow}>
          <Text style={styles.cartTitle}>BURGER</Text>
          <Text style={styles.cartPrice}>$28</Text>
        </View>

        <View style={styles.cartRatingQtyRow}>
          <View style={styles.cartRatingRow}>
            <AntDesign name="star" size={12} color="#F7B500" />
            <Text style={styles.cartRatingText}>4.8+ rating</Text>
          </View>

          <View style={styles.qtyWrap}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(Math.max(1, qty - 1))}
            >
              <Entypo name="minus" size={16} color={COLORS.text} />
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{String(qty).padStart(2, '0')}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQty(qty + 1)}
            >
              <Entypo name="plus" size={16} color={COLORS.text} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.addressRow}>
          <View style={styles.addressCard}>
            <Ionicons
              name="location-outline"
              size={18}
              color={COLORS.muted}
              style={styles.addressIcon}
            />
            <View>
              <Text style={styles.addressTitle}>Delivery Address</Text>
              <Text style={styles.addressSub}>Dhaka, Bangladesh</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editAddressBtn}>
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.paymentCard}>
          <View style={styles.paymentLeft}>
            <View style={styles.fakeCard} />
            <Text style={styles.paymentText}>Payment Method</Text>
          </View>

          <TouchableOpacity style={styles.changeBtn}>
            <Text style={styles.changeBtnText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryWrap}>
          <Text style={styles.summaryTitle}>Checkout Summary</Text>

          <SummaryRow label={`Subtotal (${qty})`} value={`$${subtotal}`} />
          <SummaryRow
            label="Delivery Fee"
            value={`$${deliveryFee.toFixed(2)}`}
          />
          <SummaryRow
            label="Payable Total"
            value={`$${total.toFixed(2)}`}
            total
          />
        </View>
      </View>

      <TouchableOpacity style={styles.confirmBtn}>
        <Text style={styles.confirmBtnText}>Confirm Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ProfileScreen({ darkMode, setDarkMode }: ProfileScreenProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.statusRow}>
        <Text style={styles.statusText}>9:00</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="cellular" size={14} color={COLORS.black} />
          <Ionicons name="wifi" size={14} color={COLORS.black} />
          <Ionicons name="battery-full" size={16} color={COLORS.black} />
        </View>
      </View>

      <View style={styles.screenHeader}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={20} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.screenHeaderTitle}>Profile</Text>

        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileTopBg} />

        <View style={styles.profileAvatarArea}>
          <View style={styles.profileAvatarOuter}>
            <View style={styles.profileAvatarOuter2}>
              <Image source={{ uri: IMAGES.avatar }} style={styles.profileAvatar} />
            </View>
          </View>

          <TouchableOpacity style={styles.profileEditBadge}>
            <Feather name="edit-2" size={12} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.profileName}>Rakibul Hasan</Text>
        <Text style={styles.profileEmail}>rakibbro@gmail.com</Text>

        <View style={styles.menuList}>
          <ProfileMenuItem
            icon={<Feather name="home" size={18} color={COLORS.text} />}
            label="Home"
          />
          <ProfileMenuItem
            icon={<Feather name="credit-card" size={18} color={COLORS.text} />}
            label="My Card"
          />

          <View style={styles.profileMenuItem}>
            <View style={styles.menuLeft}>
              <Feather name="moon" size={18} color={COLORS.text} />
              <Text style={styles.profileMenuText}>Dark Mood</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#D8DCEA', true: '#2B2B2B' }}
              thumbColor="#fff"
            />
          </View>

          <ProfileMenuItem
            icon={<Feather name="map-pin" size={18} color={COLORS.text} />}
            label="Truck Your Order"
          />
          <ProfileMenuItem
            icon={<Feather name="settings" size={18} color={COLORS.text} />}
            label="Settings"
          />
          <ProfileMenuItem
            icon={<Feather name="help-circle" size={18} color={COLORS.text} />}
            label="Help Center"
          />
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
          <Feather name="log-out" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function CategoryCard({
  icon,
  label,
  active = false,
  pinkBorder = false,
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        pinkBorder ? styles.categoryPinkBorder : null,
      ]}
      activeOpacity={0.9}
    >
      {icon}
      <Text
        style={[
          styles.categoryText,
          active ? styles.categoryTextActive : null,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function PopularCard({ title, image }: PopularCardProps) {
  return (
    <TouchableOpacity style={styles.popularCard} activeOpacity={0.9}>
      <Image source={{ uri: image }} style={styles.popularImage} />
      <Text style={styles.popularTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

function SummaryRow({ label, value, total = false }: SummaryRowProps) {
  return (
    <View style={styles.summaryRow}>
      <Text
        style={[styles.summaryLabel, total ? styles.summaryLabelTotal : null]}
      >
        {label}
      </Text>
      <Text
        style={[styles.summaryValue, total ? styles.summaryValueTotal : null]}
      >
        {value}
      </Text>
    </View>
  );
}

function ProfileMenuItem({ icon, label }: ProfileMenuItemProps) {
  return (
    <TouchableOpacity style={styles.profileMenuItem} activeOpacity={0.85}>
      <View style={styles.menuLeft}>
        {icon}
        <Text style={styles.profileMenuText}>{label}</Text>
      </View>

      <Entypo name="chevron-right" size={18} color={COLORS.text} />
    </TouchableOpacity>
  );
}

function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.bottomNavItem}
        onPress={() => setActiveTab('home')}
        activeOpacity={0.85}
      >
        <Feather
          name="home"
          size={18}
          color={activeTab === 'home' ? COLORS.purple : '#8B90A0'}
        />
        <Text
          style={[
            styles.bottomNavText,
            activeTab === 'home' ? styles.bottomNavTextActive : null,
          ]}
        >
          HOME
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomNavItem}
        onPress={() => setActiveTab('cart')}
        activeOpacity={0.85}
      >
        <MaterialCommunityIcons
          name="clipboard-list-outline"
          size={18}
          color={activeTab === 'cart' ? COLORS.purple : '#8B90A0'}
        />
        <Text
          style={[
            styles.bottomNavText,
            activeTab === 'cart' ? styles.bottomNavTextActive : null,
          ]}
        >
          ORDER
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomNavItem}
        onPress={() => setActiveTab('home')}
        activeOpacity={0.85}
      >
        <Feather
          name="grid"
          size={18}
          color={activeTab === 'home' ? COLORS.purple : '#8B90A0'}
        />
        <Text
          style={[
            styles.bottomNavText,
            activeTab === 'home' ? styles.bottomNavTextActive : null,
          ]}
        >
          INDEX
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomNavItem}
        onPress={() => setActiveTab('profile')}
        activeOpacity={0.85}
      >
        <Feather
          name="user"
          size={18}
          color={activeTab === 'profile' ? COLORS.purple : '#8B90A0'}
        />
        <Text
          style={[
            styles.bottomNavText,
            activeTab === 'profile' ? styles.bottomNavTextActive : null,
          ]}
        >
          PROFILE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  screenBody: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 10,
  },

  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },

  statusText: {
    fontSize: 12,
    color: COLORS.black,
    fontWeight: '600',
  },

  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  homeHeaderWrap: {
    backgroundColor: COLORS.yellowSoft,
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  homeHeaderTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },

  smallAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },

  locationLabel: {
    fontSize: 11,
    color: COLORS.muted,
    marginBottom: 4,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  locationValue: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },

  notifyBtn: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchBar: {
    marginTop: -14,
    alignSelf: 'center',
    width: '92%',
    height: 54,
    backgroundColor: COLORS.purple,
    borderRadius: 999,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#5B4CF0',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },

  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 22,
  },

  categoryCard: {
    width: '23%',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 82,
    paddingVertical: 10,
  },

  categoryPinkBorder: {
    borderColor: '#FF69B4',
    borderWidth: 1.5,
  },

  categoryText: {
    marginTop: 8,
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.text,
  },

  categoryTextActive: {
    color: COLORS.green,
    fontWeight: '800',
  },

  bannerCard: {
    marginTop: 16,
    height: 132,
    borderRadius: 22,
    backgroundColor: '#131313',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#17C68C',
    position: 'relative',
  },

  bannerTextBox: {
    padding: 14,
    zIndex: 2,
  },

  bannerTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#F3E84D',
  },

  bannerSubtitle: {
    marginTop: 2,
    color: '#fff',
    opacity: 0.8,
    fontSize: 12,
  },

  bannerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  bannerRatingText: {
    color: '#fff',
    opacity: 0.8,
    fontSize: 11,
    marginLeft: 6,
  },

  bannerDiscount: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },

  bannerDiscountText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 13,
  },

  bannerImage: {
    position: 'absolute',
    right: 8,
    bottom: 0,
    width: 150,
    height: 105,
    borderRadius: 18,
  },

  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 5,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4D6DD',
  },

  dotActive: {
    backgroundColor: '#222',
  },

  sectionRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },

  sectionLink: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: '500',
  },

  popularRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 12,
  },

  popularCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    overflow: 'hidden',
  },

  popularImage: {
    width: '100%',
    height: 96,
  },

  popularTitle: {
    padding: 10,
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },

  screenHeader: {
    marginTop: 4,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  screenHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },

  headerSpacer: {
    width: 20,
  },

  cartHeroCard: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    overflow: 'hidden',
  },

  cartHeroImage: {
    width: '100%',
    height: 210,
  },

  cartDiscount: {
    top: 12,
    left: 12,
    right: 'auto',
  },

  thumbRow: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 10,
    flexDirection: 'row',
    gap: 8,
  },

  thumbImage: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },

  cartInfoWrap: {
    backgroundColor: COLORS.white,
    borderRadius: 22,
    marginTop: 12,
    padding: 14,
  },

  cartTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: COLORS.text,
  },

  cartPrice: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.purple,
  },

  cartRatingQtyRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartRatingText: {
    marginLeft: 5,
    color: COLORS.muted,
    fontSize: 12,
  },

  qtyWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },

  qtyValue: {
    marginHorizontal: 10,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    minWidth: 24,
    textAlign: 'center',
  },

  addressRow: {
    marginTop: 14,
    flexDirection: 'row',
    gap: 10,
  },

  addressCard: {
    flex: 1,
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  addressIcon: {
    marginRight: 8,
  },

  addressTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },

  addressSub: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },

  editAddressBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#A89EFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentCard: {
    marginTop: 12,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E4E6EE',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fakeCard: {
    width: 28,
    height: 18,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 10,
  },

  paymentText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },

  changeBtn: {
    borderWidth: 1.3,
    borderColor: COLORS.purple,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  changeBtnText: {
    color: COLORS.purple,
    fontSize: 12,
    fontWeight: '600',
  },

  summaryWrap: {
    marginTop: 12,
  },

  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  summaryLabel: {
    fontSize: 13,
    color: COLORS.muted,
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.text,
  },

  summaryLabelTotal: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '700',
  },

  summaryValueTotal: {
    color: COLORS.purple,
    fontSize: 15,
    fontWeight: '800',
  },

  confirmBtn: {
    marginTop: 14,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  confirmBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },

  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: 26,
    overflow: 'hidden',
    minHeight: 620,
  },

  profileTopBg: {
    height: 105,
    backgroundColor: COLORS.yellowSoft,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },

  profileAvatarArea: {
    alignSelf: 'center',
    marginTop: -38,
    position: 'relative',
  },

  profileAvatarOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatarOuter2: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileAvatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },

  profileEditBadge: {
    position: 'absolute',
    right: 2,
    bottom: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileName: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: COLORS.text,
  },

  profileEmail: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 12,
    color: COLORS.muted,
  },

  menuList: {
    marginTop: 18,
    paddingHorizontal: 18,
  },

  profileMenuItem: {
    minHeight: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profileMenuText: {
    marginLeft: 14,
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },

  logoutBtn: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 18,
    height: 50,
    borderRadius: 14,
    backgroundColor: COLORS.purple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  bottomNav: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 6,
  },

  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomNavText: {
    marginTop: 4,
    fontSize: 10,
    color: '#8B90A0',
    fontWeight: '700',
  },

  bottomNavTextActive: {
    color: COLORS.purple,
    fontWeight: '800',
  },
});